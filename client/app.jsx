import React from 'react';
import Header from './components/header';
import Navbar from './components/navbar';
import LocationForm from './pages/location-form';
import RouteDetails from './pages/route-details';
import SavedRoutes from './pages/saved-routes';
import ShareForm from './pages/share-form';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import AddDateForm from './components/add-date-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      locations: {
        A: '',
        B: '',
        C: ''
      },
      routeId: null,
      sharedWith: []
    };
    this.setLocations = this.setLocations.bind(this);
    this.selectRoute = this.selectRoute.bind(this);
    this.setSharedWith = this.setSharedWith.bind(this);
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

  selectRoute(routeId) {
    this.setState({ routeId });
    window.location.hash = 'route-details';
  }

  setSharedWith(sharedWith) {
    this.setState({ sharedWith });
    window.location.hash = 'route-details';
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <LocationForm setLocations={this.setLocations} />;
    }
    if (path === 'route-details') {
      return <RouteDetails locations={this.state.locations}
        routeId={this.state.routeId} setSharedWith={this.setSharedWith}
        sharedWith={this.state.sharedWith} />;
    }
    if (path === 'saved-routes') {
      return <SavedRoutes selectRoute={this.selectRoute} />;
    }
    if (path === 'share-form') {
      return <ShareForm sharedWith={this.state.sharedWith}
        setSharedWith={this.setSharedWith} routeId={this.state.routeId} />;
    }
    if (path === 'add-date-form') {
      return <AddDateForm />;
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
