import React from 'react';

export default class getDirections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: '',
      duration: '',
      saved: false
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
    this.displayRoute();
  }

  displayRoute() {
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

  render() {
    return this.directionsRenderer.getDirections();
  }
}
