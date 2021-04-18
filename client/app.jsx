import React from 'react';
import Header from './components/header';
import Navbar from './components/navbar';
import LocationForm from './pages/location-form';
import RouteDetails from './pages/route-details';
import SavedRoutes from './pages/saved-routes';
import ShareRoute from './pages/share-route';
import EditRoute from './pages/edit-route';
import FriendsRoutes from './pages/friends-routes';
import Leaderboard from './pages/leaderboard';
import Auth from './pages/auth';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import decodeToken from './lib/decode-token';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    const token = window.localStorage.getItem('walk-with-friends-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('walk-with-friends-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('walk-with-friends-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { route } = this.state;

    if (route.path === 'sign-in' || route.path === 'sign-up') {
      return <Auth />;
    }
    if (route.path === '') {
      return <Leaderboard />;
    }
    if (route.path === 'map-route') {
      return <LocationForm />;
    }
    if (route.path === 'route-details') {
      const nameA = route.params.get('nameA');
      const nameB = route.params.get('nameB');
      const nameC = route.params.get('nameC');
      const placeA = route.params.get('placeA');
      const placeB = route.params.get('placeB');
      const placeC = route.params.get('placeC');
      const routeId = route.params.get('routeId');
      return <RouteDetails locationNames={[nameA, nameB, nameC]}
        placeIds={[placeA, placeB, placeC]} routeId={routeId} />;
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
    if (route.path === 'friends-routes') {
      return <FriendsRoutes />;
    }
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
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
