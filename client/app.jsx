import React from 'react';
import Header from './components/header';
import MapRoute from './pages/map-route';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <MapRoute />
      </>
    );
  }
}
