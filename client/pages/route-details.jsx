import React from 'react';
import SaveButton from '../components/save-button';
import Redirect from '../components/redirect';
import Spinner from '../components/spinner';
import ErrorModal from '../components/error-modal';
import formatDate from '../lib/format-date';
import AppContext from '../lib/app-context';

export default class RouteDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaved: false,
      locationNames: [],
      distance: '',
      duration: '',
      lastWalked: '',
      nextWalk: '',
      sharedWith: [],
      viewDirectionsPanel: false,
      doneLoading: false,
      errorMessage: ''
    };
    this.mapRef = React.createRef();
    this.directionsPanelRef = React.createRef();
    this.mapInstance = null;
    this.directionsService = null;
    this.directionsRenderer = null;
    this.handleClickSave = this.handleClickSave.bind(this);
    this.handleClickDirections = this.handleClickDirections.bind(this);
    this.setErrorModal = this.setErrorModal.bind(this);
  }

  componentDidMount() {
    if (!navigator.onLine) {
      this.setState({ errorMessage: 'network-error' });
      return;
    }
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
    this.setState({
      viewDirectionsPanel: true,
      locationNames: this.props.locationNames
    });
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
        const locationNames = [route.locationA, route.locationB, route.locationC];
        this.setState({
          isSaved: true,
          lastWalked: route.lastWalked,
          nextWalk: route.nextWalk,
          locationNames
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ errorMessage: 'bad-request' });
      });

    fetch(`/api/sharedRoutes/${this.props.routeId}`)
      .then(res => res.json())
      .then(sharedWith => {
        this.setState({ sharedWith });
      })
      .catch(err => {
        console.error(err);
        this.setState({ errorMessage: 'bad-request' });
      });
  }

  displayRoute(request) {
    this.directionsService.route(request, (result, status) => {
      if (status === 'OK' && result) {
        this.directionsRenderer.setDirections(result);
        this.setState({ doneLoading: true });
      } else {
        this.setState({ errorMessage: 'network-error' });
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
    const distanceMiles = (distanceMeters / 1609.34).toFixed(1);
    const durationMinutes = Math.floor(durationSeconds / 60);
    const hrString = durationMinutes < 60 ? '' : `${Math.floor(durationMinutes / 60)} hr`;
    let minString = durationMinutes % 60 === 0 ? '' : `${durationMinutes % 60} min`;
    if (!hrString && minString) minString += 'utes';
    this.setState({
      distance: distanceMiles,
      duration: `${hrString} ${minString}`
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
    const [locationA, locationB, locationC] = this.state.locationNames;
    const waypoints = this.directionsRenderer.getDirections().geocoded_waypoints;
    const placeIds = [];
    for (let i = 0; i < waypoints.length; i++) {
      placeIds.push(waypoints[i].place_id);
    }
    const { userId } = this.context.user;
    const route = {
      userId,
      locationA,
      locationB,
      locationC,
      distance: this.state.distance,
      duration: this.state.duration,
      placeIds: JSON.stringify(placeIds),
      lastWalked: this.state.lastWalked,
      nextWalk: this.state.nextWalk
    };
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(route)
    };
    const path = this.props.routeId ? this.props.routeId : '';
    fetch(`api/routes/${path}`, req)
      .then(res => {
        if (res.status === 201) {
          this.setState({ isSaved: true });
        } else {
          this.setState({ errorMessage: 'bad-request' });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ errorMessage: 'bad-request' });
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
        } else {
          this.setState({ errorMessage: 'bad-request' });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ errorMessage: 'bad-request' });
      });
  }

  handleClickDirections() {
    this.setState({ viewDirectionsPanel: !this.state.viewDirectionsPanel });
  }

  setErrorModal(errorMessage) {
    this.setState({ errorMessage });
  }

  renderDirectionsDetails() {
    const panelClass = this.state.viewDirectionsPanel ? '' : 'hidden';
    return (
      <div className={`route-details-text ${panelClass}`}>
        <div className="route-info">
          <div className="route-totals">
            <div>{`Total Distance: ${this.state.distance} mi`}</div>
            <div>{`About ${this.state.duration}`}</div>
          </div>
          { this.props.routeId
            ? ''
            : < SaveButton isSaved={this.state.isSaved} onSave={this.handleClickSave} />
          }
        </div>
        <div className="directionsPanel" ref={this.directionsPanelRef} />
      </div>
    );
  }

  renderWalkDetails() {
    return (
      <>
        <div className="walk-details">
          <div className="options">
            <div className="options-col">
              < SaveButton isSaved={this.state.isSaved}
                onSave={this.handleClickSave} />
              <div className="option-button" onClick={this.handleClickDirections}>
                { this.state.viewDirectionsPanel
                  ? <>
                      <i className="option-icon fas fa-ellipsis-h"></i>
                      <span className="button-text">Details</span>
                    </>
                  : <>
                      <i className="option-icon fas fa-directions" />
                      <span className="button-text">Directions</span>
                    </>
                }
              </div>
            </div>
            <div className="options-col">
              <a className="option-link"
                href={`#share-route?routeId=${this.props.routeId}`}>
                <div className="option-button">
                  <i className="option-icon fas fa-share" />
                  <span className="button-text">Share</span>
                </div>
              </a>
              <a className="option-link"
                href={`#edit-route?routeId=${this.props.routeId}`}>
                <div className="option-button">
                  <i className="option-icon fas fa-edit" />
                  <span className="button-text">Edit</span>
                </div>
              </a>
            </div>
          </div>
          { this.state.viewDirectionsPanel
            ? ''
            : this.renderWalkInfo()
          }
        {this.renderDirectionsDetails()}
        </div>
      </>
    );
  }

  renderWalkInfo() {
    return (
      <div className="walk-details-text">
        <div className="walk-details-section">
          <h2>Last walked</h2>
          {this.state.lastWalked
            ? <span>{formatDate(this.state.lastWalked)}</span>
            : <span className="no-data">No date added yet</span>
          }
        </div>
        <div className="walk-details-section">
          <h2>Next walk</h2>
          {this.state.nextWalk
            ? <span>{formatDate(this.state.nextWalk)}</span>
            : <span className="no-data">No date added yet</span>
          }
        </div>
        <div className="walk-details-section">
          <h2>Shared with</h2>
          {this.state.sharedWith.length > 0
            ? <ul className="shared-with-list">
              { this.state.sharedWith.map(friend => {
                return <li key={friend.userId}>{friend.name}</li>;
              })
              }
            </ul>
            : <span className="no-data">Shared with no one yet</span>
          }
        </div>
      </div>
    );
  }

  render() {
    if (!this.context.user) return <Redirect to="log-in" />;

    const routeDetailsClass = this.state.doneLoading ? '' : 'hidden';
    return (
      <div className="background">
        <div className={`route-details ${routeDetailsClass}`}>
          <div className="map" ref={this.mapRef} />
          { this.props.routeId
            ? this.renderWalkDetails()
            : this.renderDirectionsDetails()
          }
        </div>
        { this.state.doneLoading
          ? ''
          : <div className="spinner-page">
              <Spinner />
            </div>
        }
        { this.state.errorMessage
          ? <ErrorModal message={this.state.errorMessage} set={this.setErrorModal} />
          : ''
        }
      </div>
    );
  }
}

RouteDetails.contextType = AppContext;
