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
      },
      sharedWith: [],
      lastWalked: '',
      nextWalk: ''
    };
    this.setLocations = this.setLocations.bind(this);
    this.setSharedWith = this.setSharedWith.bind(this);
    this.setLastWalked = this.setLastWalked.bind(this);
    this.setNextWalk = this.setNextWalk.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  setLocations(locations) {
    this.setState({ locations });
  }

  setSharedWith(sharedWith) {
    this.setState({ sharedWith });
  }

  setLastWalked(lastWalked) {
    this.setState({ lastWalked });
  }

  setNextWalk(nextWalk) {
    this.setState({ nextWalk });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <LocationForm setLocations={this.setLocations} />;
    }
    if (route.path === 'route-details') {
      const routeId = route.params.get('routeId');
      return <RouteDetails locations={this.state.locations}
        routeId={routeId} setSharedWith={this.setSharedWith}
        sharedWith={this.state.sharedWith} lastWalked={this.state.lastWalked}
        setLastWalked={this.setLastWalked} nextWalk={this.state.nextWalk}
        setNextWalk={this.setNextWalk}/>;
    }
    if (route.path === 'saved-routes') {
      return <SavedRoutes />;
    }
    if (route.path === 'share-route') {
      const routeId = route.params.get('routeId');
      return <ShareRoute sharedWith={this.state.sharedWith}
        setSharedWith={this.setSharedWith} routeId={routeId}
        lastWalked={this.state.lastWalked} setLastWalked={this.setLastWalked}
        nextWalk={this.state.nextWalk} setNextWalk={this.setNextWalk}/>;
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
