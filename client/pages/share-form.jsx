import React from 'react';

export default class ShareForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyShared: [],
      notYetShared: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/api/friends')
      .then(res => res.json())
      .then(friends => {
        const friendsList = JSON.parse(friends[0].friendsList);
        const alreadyShared = [];
        const notYetShared = {};
        for (let i = 0; i < friendsList.length; i++) {
          const name = friendsList[i];
          if (this.props.sharedWith.includes(name)) {
            alreadyShared.push(name);
          } else {
            notYetShared[name] = false;
          }
        }
        this.setState({ alreadyShared, notYetShared });
      });
  }

  handleChange(event) {
    const friendName = event.target.value;
    const notYetShared = this.state.notYetShared;
    notYetShared[friendName] = event.target.checked;
    this.setState({ notYetShared });
  }

  handleSubmit(event) {
    event.preventDefault();
    const notYetShared = [];
    for (const friendName in this.state.notYetShared) {
      if (this.state.notYetShared[friendName]) {
        notYetShared.push(friendName);
      }
    }
    const sharedList = this.state.alreadyShared.concat(notYetShared);
    const sharedWithList = { sharedWith: JSON.stringify(sharedList) };
    const req = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sharedWithList)
    };
    fetch(`/api/routes/${this.props.routeId}`, req)
      .then(res => {
        if (res.status === 204) {
          this.props.setSharedWith(sharedList);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  renderFriends() {
    const notYetShared = Object.keys(this.state.notYetShared);
    return (
      notYetShared.map((friend, index) => {
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
