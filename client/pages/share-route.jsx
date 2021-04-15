import React from 'react';
import AddDateButton from '../components/add-date-button';

export default class ShareRoute extends React.Component {
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
    fetch(`/api/routes/sharedWith/${this.props.routeId}`, req)
      .then(res => {
        if (res.status === 204) {
          this.props.setSharedWith(sharedList);
          window.location.hash = `route-details?routeId=${this.props.routeId}`;
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  renderFriends() {
    const notYetShared = Object.keys(this.state.notYetShared).sort();
    if (notYetShared.length === 0) {
      return <p className="empty-list">No friends available to share this route with</p>;
    }
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
          <AddDateButton routeId={this.props.routeId}
            lastWalked={this.props.lastWalked} setLastWalked={this.props.setLastWalked}
            nextWalk={this.props.nextWalk} setNextWalk={this.props.setNextWalk} />
          <div className="center input-div">
            <button className="button">Share</button>
          </div>
        </form>
      </div>
    );
  }
}
