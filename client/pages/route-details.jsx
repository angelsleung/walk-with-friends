import React from 'react';
import SaveButton from '../components/save-button';
import formatDate from '../lib/format-date';

export default class RouteDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: false,
      distance: '',
      duration: '',
      lastWalked: '',
      nextWalk: '',
      sharedWith: []
    };
    this.mapRef = React.createRef();
    this.directionsPanelRef = React.createRef();
    this.mapInstance = null;
    this.directionsService = null;
    this.directionsRenderer = null;
    this.handleClickSave = this.handleClickSave.bind(this);
  }

  componentDidMount() {
    this.mapInstance = new google.maps.Map(this.mapRef.current);
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.mapInstance,
      panel: this.directionsPanelRef.current
    });
    this.directionsRenderer.addListener('directions_changed', () => {
      this.calcTotals(this.directionsRenderer.getDirections());
    });
    this.props.routeId ? this.calcSavedRoute() : this.calcNewRoute();
  }

  calcNewRoute() {
    const [placeA, placeB, placeC] = this.props.placeIds;
    const request = {
      origin: { placeId: placeA },
      destination: { placeId: placeA },
      waypoints: [
        { location: { placeId: placeB } },
        { location: { placeId: placeC } }
      ],
      travelMode: 'WALKING'
    };
    this.displayRoute(request);
  }

  calcSavedRoute() {
    fetch(`/api/routes/${this.props.routeId}`)
      .then(res => res.json())
      .then(route => {
        const placeIds = JSON.parse(route.placeIds);
        const waypoints = [];
        for (let i = 1; i < placeIds.length; i++) {
          waypoints.push({ location: { placeId: placeIds[i] } });
        }
        const request = {
          origin: { placeId: placeIds[0] },
          destination: { placeId: placeIds[0] },
          waypoints,
          travelMode: 'WALKING'
        };
        this.displayRoute(request);
        this.setState({
          isSaved: true,
          lastWalked: route.lastWalked,
          nextWalk: route.nextWalk,
          sharedWith: JSON.parse(route.sharedWith)
        });
      });
  }

  displayRoute(request) {
    this.directionsService.route(request, (result, status) => {
      if (status === 'OK' && result) {
        this.directionsRenderer.setDirections(result);
      }
    });
  }

  calcTotals(directionResult) {
    const legs = directionResult.routes[0].legs;
    let distanceMeters = 0;
    let durationSeconds = 0;
    for (let i = 0; i < legs.length; i++) {
      distanceMeters += legs[i].distance.value;
      durationSeconds += legs[i].duration.value;
    }
    const distanceMiles = `${(distanceMeters / 1609.34).toFixed(1)} mi`;
    const durationMinutes = Math.floor(durationSeconds / 60);
    let durationString = durationMinutes > 60
      ? `${Math.floor(durationMinutes / 60)} hr ${durationMinutes % 60} min`
      : `${durationMinutes} minute`;
    if (durationMinutes > 1) durationString += 's';
    this.setState({
      distance: distanceMiles,
      duration: durationString
    });
  }

  handleClickSave() {
    if (this.state.isSaved) {
      this.unsaveRoute();
    } else {
      this.saveRoute();
    }
  }

  saveRoute() {
    const [locationA, locationB, locationC] = this.props.locationNames;
    const waypoints = this.directionsRenderer.getDirections().geocoded_waypoints;
    const placeIds = [];
    for (let i = 0; i < waypoints.length; i++) {
      placeIds.push(waypoints[i].place_id);
    }
    const route = {
      locationA,
      locationB,
      locationC,
      distance: this.state.distance,
      duration: this.state.duration,
      placeIds: JSON.stringify(placeIds),
      lastWalked: this.state.lastWalked,
      nextWalk: this.state.nextWalk,
      sharedWith: JSON.stringify(this.state.sharedWith)
    };
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(route)
    };
    const userId = 1;
    fetch(`api/savedRoutes/${userId}`, req)
      .then(res => res.json())
      .then(route => {
        this.setState({ isSaved: true });
      })
      .catch(err => {
        console.error(err);
      });
  }

  unsaveRoute() {
    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`/api/routes/${this.props.routeId}`, req)
      .then(res => {
        if (res.status === 204) {
          this.setState({ isSaved: false });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  renderDirectionsDetails() {
    return (
      <div className="route-details-text">
        <div className="route-info">
          <div className="route-totals">
            <div>{`Total Distance: ${this.state.distance}`}</div>
            <div>{`About ${this.state.duration}`}</div>
          </div>
          < SaveButton isSaved={this.state.isSaved} onSave={this.handleClickSave} />
        </div>
        <div className="directionsPanel" ref={this.directionsPanelRef} />
      </div>
    );
  }

  renderWalkDetails() {
    return (
      <div className="walk-details">
        <div className="options">
          <div className="options-col">
            < SaveButton isSaved={this.state.isSaved}
              onSave={this.handleClickSave} />
            <div className="option-button">
              <i className="directions-icon fas fa-directions" />
              <span className="button-text">Directions</span>
            </div>
          </div>
          <div className="options-col">
            <a className="option-link"
              href={`#share-route?routeId=${this.props.routeId}`}>
              <div className="option-button">
                <i className="share-icon fas fa-share" />
                <span className="button-text">Share</span>
              </div>
            </a>
            <a className="option-link"
              href={`#edit-route?routeId=${this.props.routeId}`}>
              <div className="option-button">
                <i className="edit-icon fas fa-edit" />
                <span className="button-text">Edit</span>
              </div>
            </a>
          </div>
        </div>
        <div className="walk-details-text">
          <div className="walk-details-section">
            <h2>Last walked</h2>
            { this.state.lastWalked
              ? <span>{formatDate(this.state.lastWalked)}</span>
              : <span className="no-data">No date added yet</span>
            }
          </div>
          <div className="walk-details-section">
            <h2>Next walk</h2>
            { this.state.nextWalk
              ? <span>{formatDate(this.state.nextWalk)}</span>
              : <span className="no-data">No date added yet</span>
            }
          </div>
          <div className="walk-details-section">
            <h2>Shared with</h2>
            { this.state.sharedWith.length > 0
              ? <ul>
                  {this.state.sharedWith.sort().map((friend, index) => {
                    return <li key={index}>{friend}</li>;
                  })}
                </ul>
              : <span className="no-data">Shared with no one yet</span>
            }
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="route-details">
        <div className="map" ref={this.mapRef} />
        {this.props.routeId
          ? this.renderWalkDetails()
          : this.renderDirectionsDetails()
        }
      </div>
    );
  }
}
