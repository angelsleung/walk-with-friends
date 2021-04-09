import React from 'react';

export default class RouteMap extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
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
    this.calcRoute();
  }

  calcRoute() {
    const { A, B, C } = this.props.locations;
    const locationA = A.place_id;
    const locationB = B.place_id;
    const locationC = C.place_id;
    const req = {
      origin: { placeId: locationA },
      destination: { placeId: locationA },
      waypoints: [
        { location: { placeId: locationB } },
        { location: { placeId: locationC } }
      ],
      travelMode: 'WALKING'
    };

    this.directionsService.route(req, (res, status) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(res);
      }
    });
  }

  render() {
    return <div className="map" ref={this.mapRef} />;
  }
}
