import React from 'react';

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
  }

  componentDidMount() {
    const userId = 1;
    fetch(`/api/savedRoutes/${userId}`)
      .then(res => res.json())
      .then(routes => {
        let weeklyDistance = 0;
        for (let i = 0; i < routes.length; i++) {
          if (routes[i].lastWalked) {
            const parsedDate = Date.parse(routes[i].lastWalked);
            const [weekStart, weekEnd] = this.getWeek();
            if (parsedDate >= weekStart && parsedDate <= weekEnd) {
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

  getWeek() {
    const now = new Date();
    const today = new Date(now.toLocaleDateString());
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekEnd = new Date(today.setDate(today.getDate() + 6));
    return [weekStart, weekEnd];
  }

  renderFriends() {
    const sortedFriends = this.state.friends.sort((a, b) => b.weeklyDistance -
      a.weeklyDistance);
    return (
      sortedFriends.map((friend, index) => {
        return (
          <div key={friend.userId} className="friend-item">
            <div className="friend-name-rank">
              <div className="friend-rank">{index + 1}</div>
              <i className="friend-icon fas fa-user-circle"></i>
              <div className="friend-name">{friend.name}</div>
            </div>
            <div className="friend-distance">{`${friend.weeklyDistance} mi`}</div>
          </div>
        );
      })
    );
  }

  render() {
    const [weekStart, weekEnd] = this.getWeek();
    const weekFormatted = `Sun ${weekStart.getMonth() + 1}/${weekStart.getDate()}
      - Sat ${weekEnd.getMonth() + 1}/${weekEnd.getDate()}`;
    return (
      <div className="page">
        <h1 className="page-title">Friends</h1>
        <h2 className="week">{weekFormatted}</h2>
        <div className="home-friends-list">
          {this.renderFriends()}
        </div>
      </div>
    );
  }
}
