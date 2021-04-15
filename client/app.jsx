import React from 'react';
import Header from './components/header';
import Navbar from './components/navbar';
import LocationForm from './pages/location-form';
import RouteDetails from './pages/route-details';
import SavedRoutes from './pages/saved-routes';
import ShareRoute from './pages/share-route';
import EditRoute from './pages/edit-route';
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
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <LocationForm setLocations={this.setLocations} />;
    }
    if (route.path === 'route-details') {
      const routeId = route.params.get('routeId');
      return <RouteDetails locations={this.state.locations} routeId={routeId} />;
    }
    if (route.path === 'saved-routes') {
      return <SavedRoutes />;
    }
    if (route.path === 'share-route') {
      const routeId = route.params.get('routeId');
      return <ShareRoute routeId={routeId} />;
    }
    if (route.path === 'edit-route') {
      const routeId = route.params.get('routeId');
      return <EditRoute routeId={routeId} />;
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
        <Navbar />
      </AppContext.Provider>
    );
  }
}
