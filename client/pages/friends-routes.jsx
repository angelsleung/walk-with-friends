import React from 'react';
import formatDate from '../lib/format-date';

export default class FriendsRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { routes: [] };
  }

  componentDidMount() {
    fetch('/api/friendsRoutes')
      .then(res => res.json())
      .then(routes => {
        this.setState({ routes });
      });
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
          <div key={route.routeId} className="route-list-item">
            <div className="route-icon-details">
              <i className="shoes-icon fas fa-shoe-prints"></i>
              <div className="route-item-details">
                <h2>{`${route.friendName}'s Route`}</h2>
                <p>{date}</p>
                <p>{time}</p>
              </div>
            </div>
            <div className="route-item-totals">
              <div className="route-item-distance">{route.distance}</div>
              <div className="route-item-duration">{duration}</div>
            </div>
          </div>
        );
      })
    );
  }

  render() {
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
