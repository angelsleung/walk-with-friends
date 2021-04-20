import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import formatDate from '../lib/format-date';

export default class FriendsRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { routes: [] };
    this.handleClickRoute = this.handleClickRoute.bind(this);
  }

  componentDidMount() {
    const { userId } = this.context.user;
    fetch(`/api/friendsRoutes/${userId}`)
      .then(res => res.json())
      .then(routes => {
        this.setState({ routes });
      });
  }

  handleClickRoute(event) {
    const route = event.target.closest('.route-list-item');
    const [placeIdA, placeIdB, placeIdC] = JSON.parse(route.dataset.placeIds);
    const locationA = route.dataset.locationA;
    const locationB = route.dataset.locationB;
    const locationC = route.dataset.locationC;
    window.location.hash = `route-details?nameA=${locationA}&nameB=${locationB}&nameC=${locationC}&placeA=${placeIdA}&placeB=${placeIdB}&placeC=${placeIdC}`;
  }

  renderRoutes() {
    if (this.state.routes.length === 0) {
      return <p className="no-routes">No routes yet</p>;
    }
    return (
      this.state.routes.map(route => {
        const [date, time] = formatDate(route.nextWalk).split(' @ ');
        const duration = route.duration.replace('minutes', 'mins');
        return (
          <div key={route.routeId} onClick={this.handleClickRoute}
            className="friend route-list-item" data-place-ids={route.placeIds}
            data-location-a={route.locationA} data-location-b={route.locationB}
            data-location-c={route.locationC}>
            <div className="route-icon-details">
              <i className="shoes-icon fas fa-shoe-prints"></i>
              <div className="route-item-details">
                <h2>{`${route.name}'s Route`}</h2>
                <p>{date}</p>
                <p>{time}</p>
              </div>
            </div>
            <div className="friend route-item-totals">
              <div className="route-item-distance">{`${route.distance} mi`}</div>
              <div className="route-item-duration">{duration}</div>
            </div>
          </div>
        );
      })
    );
  }

  render() {
    if (!this.context.user) return <Redirect to="log-in" />;

    return (
      <div className="page">
        <h1 className="page-title">{"Friends' Routes"}</h1>
        <div className="route-list">
          {this.renderRoutes()}
        </div>
      </div>
    );
  }
}

FriendsRoutes.contextType = AppContext;
