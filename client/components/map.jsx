import React from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { start: '' };
    this.mapRef = React.createRef();
    this.mapInstance = null;
  }

  componentDidMount() {
    const loader = new Loader({
      apiKey: 'AIzaSyCG4ySJPtAS0a5rJRHZV8uPM6fgOzCZD0A'
    });

    const google = null;
    loader.load().then(() => {
      this.mapInstance = new google.maps.Map(this.mapRef.current,
        {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8
        }
      );
    });
  }

  render() {
    return <div className="map" ref={this.mapRef} />;
  }
}
