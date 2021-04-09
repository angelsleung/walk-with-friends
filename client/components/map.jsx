import React from 'react';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.mapInstance = null;
    this.directionsService = null;
    this.directionsRenderer = null;
    this.calcRoute = this.calcRoute.bind(this);
  }

  componentDidMount() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer(
      {
        draggable: true
      }
    );
    this.mapInstance = new google.maps.Map(this.mapRef.current,
      {
        // center: { lat: 47.6062, lng: -122.3321 },
        center: { lat: 47.6062, lng: -122.3321 },
        zoom: 7
      }
    );
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
        {
          location: { placeId: locationB }
        },
        {
          location: { placeId: locationC }
        }
      ],
      travelMode: 'DRIVING'
    };
    // const req = {
    //   origin: { lat: 47.6062, lng: -122.3321 },
    //   destination: { lat: 42.4668, lng: -70.9495 },
    //   waypoints: [
    //     {
    //       location: { lat: 42.7762, lng: -71.0773 },
    //       stopover: true
    //     },
    //     {
    //       location: { lat: 42.8584, lng: -70.9300 },
    //       stopover: true
    //     }
    //   ],
    //   travelMode: 'WALKING'
    // };

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
