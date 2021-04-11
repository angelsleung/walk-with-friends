import React from 'react';
import SaveButton from '../components/save-button';

export default class RouteDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: '',
      duration: '',
      saved: false,
      newSearch: false
    };
    this.mapRef = React.createRef();
    this.directionsPanelRef = React.createRef();
    this.mapInstance = null;
    this.directionsService = null;
    this.directionsRenderer = null;
    this.handleSave = this.handleSave.bind(this);
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
    // this.displayRoute();
  }

  displayRoute(directionsResult) {
    // const { A, B, C } = this.props.locations;
    const req = {
      origin: { placeId: 'ChIJYVqRI4dskFQRVWnuu-Qjk0E' },
      destination: { placeId: 'ChIJYVqRI4dskFQRVWnuu-Qjk0E' },
      waypoints: [
        { location: { placeId: 'ChIJW4VXzodskFQRseSBkOHh9Vg' } },
        { location: { placeId: 'ChIJF7Wdd4ZskFQRhk02OceIcdo' } }
      ],
      // origin: { placeId: A.place_id },
      // destination: { placeId: A.place_id },
      // waypoints: [
      //   { location: { placeId: B.place_id } },
      //   { location: { placeId: C.place_id } }
      // ],
      travelMode: 'WALKING'
    };
    this.directionsService.route(req, (res, status) => {
      if (status === 'OK' && res) {
        this.directionsRenderer.setDirections(res);
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
    let durationString = durationMinutes > 60
      ? `${Math.floor(durationMinutes / 60)} hr ${durationMinutes % 60} min`
      : `${durationMinutes} minute`;
    if (durationMinutes > 1) durationString += 's';
    this.setState({
      distance: distanceMiles,
      duration: durationString
    });
  }

  handleSave() {
    this.setState({ saved: !this.state.saved });
    // const directions = JSON.stringify();
  }

  renderOptions() {
    return (
      <div className="options">
        <div className="row">
          < SaveButton saved={this.state.saved} onSave={this.handleSave} />
          <div className="share-button">
            <i className="share-icon fas fa-share"></i>
            <span className="button-text">Share</span>
          </div>
        </div>
        <div className="row">
          <div className="directions-button">
            <i className="directions-icon fas fa-directions"></i>
            <span className="button-text">Directions</span>
          </div>
          <div className="edit-button">
            <i className="edit-icon fas fa-edit"></i>
            <span className="button-text">Edit</span>
          </div>
        </div>
      </div>
    );
  }

  renderWalkDetails() {
    return (
      <div className="walk-details">
        <div className="walk-details-section">
          <h2>Last walked</h2>
          <span>4/1/21</span>
        </div>
        <div className="walk-details-section">
          <h2>Next walk</h2>
          <span>4/17/21 @ 12:00pm</span>
        </div>
        <div className="walk-details-section">
          <h2>Shared with</h2>
          <ul>
            <li>Misty</li>
            <li>Brock</li>
          </ul>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="route-details">
        <div className="map" ref={this.mapRef} />
        {/* <div className="route-details-text">
          <div className="route-info">
            <div className="route-totals">
              <div>{`Total Distance: ${this.state.distance} mi`}</div>
              <div>{`About ${this.state.duration}`}</div>
            </div>
            < SaveButton saved={this.state.saved} onSave={this.handleSave} />
          </div>
          <div className="directionsPanel" ref={this.directionsPanelRef} />
        </div> */}
        <div className="walk-details-text">
          {this.renderOptions()}
          {this.renderWalkDetails()}
        </div>
      </div>
    );
  }
}
