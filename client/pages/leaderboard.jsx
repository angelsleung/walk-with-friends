import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
  }

  componentDidMount() {
    if (!this.context.user) return <Redirect to="log-in" />;
    const { userId } = this.context.user;
    fetch(`/api/savedRoutes/${userId}`)
      .then(res => res.json())
      .then(routes => {
        let weeklyDistance = 0;
        for (let i = 0; i < routes.length; i++) {
          if (routes[i].lastWalked) {
            const parsedDate = Date.parse(routes[i].lastWalked);
            const weekStart = this.getSunday();
            const weekEnd = new Date(this.getSunday().setDate(this.getSunday().getDate() +
              7));
            if (parsedDate >= weekStart && parsedDate < weekEnd) {
              weeklyDistance += routes[i].distance;
            }
          }
        }
        fetch(`/api/friends/${userId}`)
          .then(res => res.json())
          .then(friends => {
            const me = {
              name: 'Me',
              userId,
              weeklyDistance
            };
            friends.push(me);
            this.setState({ friends });
          });
      });
  }

  getSunday() {
    const now = new Date();
    const today = new Date(now.toLocaleDateString());
    return new Date(today.setDate(today.getDate() - today.getDay()));
  }

  renderFriends() {
    const sortedFriends = this.state.friends.sort((a, b) => b.weeklyDistance -
      a.weeklyDistance);
    return (
      sortedFriends.map((friend, index) => {
        return (
          <li key={friend.userId} className="friend-item">
            <div className="friend-name-rank">
              <div className="friend-rank">{index + 1}</div>
              <i className="friend-icon fas fa-user-circle" />
              <div className="friend-name">{friend.name}</div>
            </div>
            <div className="friend-distance">{`${friend.weeklyDistance} mi`}</div>
          </li>
        );
      })
    );
  }

  render() {
    if (!this.context.user) return <Redirect to="log-in" />;

    const sunday = this.getSunday();
    const saturday = new Date(this.getSunday().setDate(this.getSunday().getDate() +
      6));
    const weekFormatted = `Sun ${sunday.getMonth() + 1}/${sunday.getDate()}
      - Sat ${saturday.getMonth() + 1}/${saturday.getDate()}`;
    return (
      <div className="page">
        <h1 className="page-title">My Friends</h1>
        <h2 className="week">{weekFormatted}</h2>
        <ol className="home-friends-list">
          {this.renderFriends()}
        </ol>
      </div>
    );
  }
}

Leaderboard.contextType = AppContext;
