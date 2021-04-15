import React from 'react';

export default class SavedRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: []
    };
    this.handleClickRoute = this.handleClickRoute.bind(this);
  }

  componentDidMount() {
    fetch('/api/routes')
      .then(res => res.json())
      .then(routes => {
        this.setState({ routes });
      });
  }

  handleClickRoute(event) {
    const clickedRoute = event.target.closest('.route-list-item');
    const routeId = clickedRoute.getAttribute('route-id');
    window.location.hash = `route-details?routeId=${routeId}`;
  }

  renderRoutes() {
    if (this.state.routes.length === 0) {
      return <p className="empty-list">No saved routes yet!</p>;
    }
    return (
      this.state.routes.map(route => {
        return (
          <div key={route.routeId} className="route-list-item"
            onClick={this.handleClickRoute} route-id={route.routeId}>
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
              <div className="route-item-distance">{route.distance}</div>
              <div className="route-item-duration">{route.duration}</div>
            </div>
          </div>
        );
      })
    );
  }

  render() {
    return (
      <div className="page">
        <h1 className="page-title">Saved Routes</h1>
        <div className="route-list">
          {this.renderRoutes()}
        </div>
      </div>
    );
  }
}
