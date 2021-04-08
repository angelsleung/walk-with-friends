import React from 'react';
import Header from './components/header';
import MapRoute from './pages/map-route';
import Map from './components/map';
import parseRoute from '../server/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'map-route') {
      return < MapRoute />;
    }
    if (route.path === 'route-details') {
      return < Map />;
    }
  }

  render() {
    return (
      <>
        <Header />
        { this.renderPage() }
      </>
    );
  }
}
