import React from 'react';

export default class RouteDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: '',
      duration: ''
    };
    this.mapRef = React.createRef();
    this.directionsPanelRef = React.createRef();
    this.mapInstance = null;
    this.directionsService = null;
    this.directionsRenderer = null;
  }

  componentDidMount() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer(
      { draggable: true });
    this.mapInstance = new google.maps.Map(this.mapRef.current);
    this.directionsRenderer.setMap(this.mapInstance);
    this.directionsRenderer.setPanel(this.directionsPanelRef.current);
    this.calcRoute();
  }

  calcRoute() {
    const { A, B, C } = this.props.locations;
    const req = {
      origin: { placeId: A.place_id },
      destination: { placeId: A.place_id },
      waypoints: [
        { location: { placeId: B.place_id } },
        { location: { placeId: C.place_id } }
      ],
      travelMode: 'WALKING'
    };

    this.directionsService.route(req, (res, status) => {
      if (status === 'OK' && res) {
        this.directionsRenderer.setDirections(res);
        this.calcTotals(res);
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
    const durationString = durationMinutes > 60
      ? `${Math.floor(durationMinutes / 60)} hr ${durationMinutes % 60} min`
      : `${durationMinutes} min`;
    this.setState({
      distance: distanceMiles,
      duration: durationString
    });
  }

  render() {
    return (
      <div className="route-details">
        <div className="map" ref={this.mapRef} />
        <div className="route-details-text">
          <div className="route-info">
            <div className="route-totals">
              <div>{`Total Distance: ${this.state.distance} mi`}</div>
              <div>{`About ${this.state.duration}`}</div>
            </div>
          </div>
          <div className="directionsPanel" ref={this.directionsPanelRef} />
          <br></br>
        </div>
      </div>
    );
  }
}
