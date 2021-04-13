import React from 'react';

export default class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
  }

  getFriends() {
    fetch('/api/friends')
      .then(res => res.json())
      .then(friends => this.setState({ friends }));
  }

  renderFriends() {
    return (
      this.state.friends.map((friend, index) => {
        return (
          <div key={index} className="friend-list-item">
            <input type="checkbox" className="checkbox" id={index} name="friend"></input>
            <label className="friend-label" htmlFor={index}>
              <i className="friend-icon fas fa-user-circle"></i>
              <p className="friend-name">{friend}</p>
            </label>
          </div>
        );
      })
    );
  }

  render() {
    return (
      <div className="page">
        <h1 className="page-title">Select Friend</h1>
        <div className="friend-list">
          {this.renderFriends()}
        </div>
        <div className="add-date-div">
          <i className="add-date-icon fas fa-calendar-plus"></i>
          <p className="add-date-text">Add a date</p>
        </div>
        <div className="center input-div">
          <a href="#route-details"><button className="button">Share</button></a>
        </div>
      </div>
    );
  }
}
