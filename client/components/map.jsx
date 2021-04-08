import React from 'react';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.mapInstance = null;
  }

  componentDidMount() {
  }

  render() {
    return <div className="map" ref={this.mapRef} />;
  }
}
