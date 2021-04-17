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
    fetch(`/api/friends/${userId}`)
      .then(res => res.json())
      .then(friends => {
        this.setState({ friends });
      });
  }

  renderFriends() {
    return (
      this.state.friends.map((friend, index) => {
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
    return (
      <div className="page">
        <h1 className="page-title">Friends</h1>
        <h2 className="week">Sun 4/4 - Sat 4/10</h2>
        <div className="home-friends-list">
          {this.renderFriends()}
        </div>
      </div>
    );
  }
}
