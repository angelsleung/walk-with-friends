import React from 'react';

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { friends: [] };
  }

  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(friendsList => {
        const friends = JSON.parse(friendsList[0].friends);
        this.setState({ friends });
      });
  }

  renderFriends() {
    return (
      <div className="friend-item">
        <div className="friend-name-rank">
          <div className="friend-rank">1</div>
          <i className="friend-icon fas fa-user-circle"></i>
          <div className="friend-name">Ash</div>
        </div>
        <div className="friend-distance">5.2 mi</div>
      </div>
    );
  }

  render() {
    return (
      <div className="page">
        <h1 className="page-title">Friends</h1>
        <h2 className="week">Sun 4/4 - Sat 4/10</h2>
        <div className="friends-list">
          {this.renderFriends()}
        </div>
      </div>
    );
  }
}
