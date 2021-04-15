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
      routeId: null,
      sharedWith: [],
      lastWalked: '',
      nextWalk: ''
    };
    this.setLocations = this.setLocations.bind(this);
    this.setRouteId = this.setRouteId.bind(this);
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
    window.location.hash = 'route-details';
  }

  setRouteId(routeId) {
    this.setState({ routeId });
    window.location.hash = 'route-details';
  }

  setSharedWith(sharedWith) {
    this.setState({ sharedWith });
    window.location.hash = 'route-details';
  }

  setLastWalked(lastWalked) {
    this.setState({ lastWalked });
  }

  setNextWalk(nextWalk) {
    this.setState({ nextWalk });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <LocationForm setLocations={this.setLocations}
        setRouteId={this.setRouteId} />;
    }
    if (path === 'route-details') {
      return <RouteDetails locations={this.state.locations}
        routeId={this.state.routeId} setSharedWith={this.setSharedWith}
        sharedWith={this.state.sharedWith} lastWalked={this.state.lastWalked}
        setLastWalked={this.setLastWalked} nextWalk={this.state.nextWalk}
        setNextWalk={this.setNextWalk}/>;
    }
    if (path === 'saved-routes') {
      return <SavedRoutes setRouteId={this.setRouteId} />;
    }
    if (path === 'share-route') {
      return <ShareRoute sharedWith={this.state.sharedWith}
        setSharedWith={this.setSharedWith} routeId={this.state.routeId}
        lastWalked={this.state.lastWalked} setLastWalked={this.setLastWalked}
        nextWalk={this.state.nextWalk} setNextWalk={this.setNextWalk}/>;
    }
    if (path === 'edit-route') {
      return <EditRoute routeId={this.state.routeId}
        lastWalked={this.state.lastWalked} setLastWalked={this.setLastWalked}
        nextWalk={this.state.nextWalk} setNextWalk={this.setNextWalk} />;
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
