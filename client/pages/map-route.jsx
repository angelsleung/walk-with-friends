import React from 'react';
import LocationForm from '../components/location-form';
import Map from '../components/map';

export default class MapRoute extends React.Component {
  render() {
    return (
      <>
        < Map />
        < LocationForm />
      </>
    );
  }
}
