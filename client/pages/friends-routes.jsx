import React from 'react';

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
    return (
      <div className="route-list-item">
        <div className="route-icon-details">
          <i className="shoes-icon fas fa-shoe-prints"></i>
          <div className="route-item-details">
            <h2>{"Misty's Route"}</h2>
            <p>Saturday 4/3/21</p>
            <p>11:00am</p>
          </div>
        </div>
        <div className="route-item-totals">
          <div className="route-item-distance">0.7 mi</div>
          <div className="route-item-duration">15 mins</div>
        </div>
      </div>
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
