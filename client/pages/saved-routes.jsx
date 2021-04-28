import React from 'react';
import Redirect from '../components/redirect';
import Spinner from '../components/spinner';
import ErrorModal from '../components/error-modal';
import AppContext from '../lib/app-context';

export default class SavedRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [],
      doneLoading: false,
      errorMessage: ''
    };
    this.handleClickRoute = this.handleClickRoute.bind(this);
    this.setErrorModal = this.setErrorModal.bind(this);
  }

  componentDidMount() {
    if (!navigator.onLine) {
      this.setState({ errorMessage: 'network-error' });
      return;
    }

    const { userId } = this.context.user;
    fetch(`/api/savedRoutes/${userId}`)
      .then(res => res.json())
      .then(routes => {
        this.setState({
          routes,
          doneLoading: true
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ errorMessage: 'bad-request' });
      });
  }

  handleClickRoute(event) {
    const clickedRoute = event.target.closest('.route-list-item');
    const routeId = clickedRoute.dataset.routeId;
    window.location.hash = `route-details?routeId=${routeId}`;
  }

  setErrorModal(errorMessage) {
    this.setState({ errorMessage });
  }

  renderRoutes() {
    if (this.state.routes.length === 0) {
      return <p className="no-routes">No saved routes yet!</p>;
    }
    return (
      this.state.routes.map(route => {
        const duration = route.duration.replace('minutes', 'mins');
        return (
          <li key={route.routeId} className="route-list-item"
            onClick={this.handleClickRoute} data-route-id={route.routeId}>
            <div className="route-item-locations">
              <div className="route-item-icon-location">
                <i className="walk-icon fas fa-walking"></i>
                <div className="route-item-start-location">{route.locationA}</div>
              </div>
              <div className="route-item-icon-location stop-location">
                <i className="marker-icon fas fa-map-marker-alt"></i>
                <div className="route-item-stop-location">{route.locationB}</div>
              </div>
              <div className="route-item-icon-location stop-location">
                <i className="marker-icon fas fa-map-marker-alt"></i>
                <div className="route-item-stop-location">{route.locationC}</div>
              </div>
            </div>
            <div className="route-item-totals">
              <div className="route-item-distance">{`${route.distance} mi`}</div>
              <div className="route-item-duration">{duration}</div>
            </div>
          </li>
        );
      })
    );
  }

  render() {
    if (!this.context.user) return <Redirect to="log-in" />;

    return (
      <div className="page">
        <h1 className="page-title">Saved Routes</h1>
        { this.state.doneLoading
          ? <ul className="route-list">
              {this.renderRoutes()}
            </ul>
          : <Spinner />
        }
        { this.state.errorMessage
          ? <ErrorModal message={this.state.errorMessage} set={this.setErrorModal} />
          : ''
        }
      </div>
    );
  }
}

SavedRoutes.contextType = AppContext;
