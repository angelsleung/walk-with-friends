import React from 'react';

export default class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newFriends: []
    };
  }

  componentDidMount() {
    fetch('/api/friends')
      .then(res => res.json())
      .then(friendsList => {
        const friends = JSON.parse(friendsList[0].friendsList);
        const newFriends = friends.filter(friend => !this.props.sharedWith.includes(friend));
        this.setState({ newFriends });
      });
  }

  renderFriends() {
    return (
      this.state.newFriends.map((friend, index) => {
        return (
          <div key={index} className="friend-list-item">
            <input type="checkbox" className="checkbox" id={index} name="friend" />
            <label className="friend-label" htmlFor={index}>
              <i className="friend-icon fas fa-user-circle" />
              <p className="friend-name">{friend}</p>
            </label>
          </div>
        );
      })
    );
  }

  shareRoute() {

  }

  render() {
    return (
      <div className="page">
        <h1 className="page-title">Select Friend</h1>
        <div className="friend-list">
          {this.renderFriends()}
        </div>
        <div className="add-date-div">
          <i className="add-date-icon fas fa-calendar-plus" />
          <p className="add-date-text">Add a date</p>
        </div>
        <div className="center input-div">
          <a href="#route-details"><button className="button">Share</button></a>
        </div>
      </div>
    );
  }
}
