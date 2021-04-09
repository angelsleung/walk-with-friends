import React from 'react';

export default class RouteMap extends React.Component {
  constructor(props) {
    super(props);
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
      if (status === 'OK') {
        this.directionsRenderer.setDirections(res);
      }
    });
  }

  render() {
    return (
      <>
        <div className="map" ref={this.mapRef} />
        <div className="directionsPanel" ref={this.directionsPanelRef} />
      </>
    );
  }
}
