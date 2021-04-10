import React from 'react';
import Header from './components/header';
import LocationForm from './pages/location-form';
import RouteDetails from './pages/route-details';
import SavedRoutes from './pages/saved-routes';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      locations: {
        A: '',
        B: '',
        C: ''
      }
    };
    this.setLocations = this.setLocations.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  setLocations(locations) {
    this.setState({ locations });
    window.location.hash = 'route-details';
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return < LocationForm setLocations={this.setLocations} />;
    }
    if (path === 'route-details') {
      return < RouteDetails locations={this.state.locations} />;
    }
    if (path === 'saved-routes') {
      return < SavedRoutes />;
    }
  }

  render() {
    const contextValue = this.state.route;
    return (
      <AppContext.Provider value={contextValue}>
        <div className="container">
          <Header />
          { this.renderPage() }
        </div>
      </AppContext.Provider>
    );
  }
}
