import React from 'react';

export default class ShareForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/api/friends')
      .then(res => res.json())
      .then(contacts => {
        const friendsList = JSON.parse(contacts[0].friendsList);
        const friends = {};
        for (let i = 0; i < friendsList.length; i++) {
          const name = friendsList[i];
          if (!this.props.sharedWith.includes(name)) {
            friends[name] = false;
          }
        }
        this.setState({ friends });
      });
  }

  handleChange(event) {
    const friendName = event.target.value;
    const friends = this.state.friends;
    friends[friendName] = event.target.checked;
    this.setState({ friends });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.friends)
    };
    fetch(`/api/routes/${this.state.routeId}`, req)
      .then(res => res.json())
      .then()
      .catch(err => {
        console.error(err);
      });
  }

  renderFriends() {
    const friendsArray = Object.keys(this.state.friends);
    return (
      friendsArray.map((friend, index) => {
        return (
          <div key={index} className="friend-list-item">
            <input type="checkbox" className="checkbox" id={index} name="friend"
              value={friend} onChange={this.handleChange}/>
            <label className="friend-label" htmlFor={index}>
              <i className="friend-icon fas fa-user-circle" />
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
        <form className="share-form" onSubmit={this.handleSubmit}>
          <h1 className="page-title">Select Friend</h1>
          <div className="friend-list">
            {this.renderFriends()}
          </div>
          <div className="add-date-div">
            <i className="add-date-icon fas fa-calendar-plus" />
            <p className="add-date-text">Add a date</p>
          </div>
          <div className="center input-div">
            <a href="#route-details">
              <button className="button">Share</button>
              </a>
          </div>
        </form>
      </div>
    );
  }
}
