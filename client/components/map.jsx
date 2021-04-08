import React from 'react';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.mapInstance = null;
  }

  componentDidMount() {
    this.mapInstanceA = new google.maps.Map(this.mapRef.current,
      {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      }
    );
  }

  render() {
    return <div className="map" ref={this.mapRef} />;
  }
}
