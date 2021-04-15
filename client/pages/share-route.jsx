import React from 'react';
import AddDateButton from '../components/add-date-button';
import AddDateForm from '../components/add-date-form';

export default class ShareRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sharedWith: [],
      notYetShared: {},
      lastWalked: '',
      nextWalk: '',
      modalOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setLastWalked = this.setLastWalked.bind(this);
    this.setNextWalk = this.setNextWalk.bind(this);
    this.setModal = this.setModal.bind(this);
  }

  componentDidMount() {
    fetch(`/api/routes/${this.props.routeId}`)
      .then(res => res.json())
      .then(route => {
        this.setState({ sharedWith: JSON.parse(route.sharedWith) });
        this.getRemainingFriends();
      });
  }

  getRemainingFriends() {
    fetch('/api/users')
      .then(res => res.json())
      .then(friends => {
        const friendsList = JSON.parse(friends[0].friends);
        const notYetShared = {};
        for (let i = 0; i < friendsList.length; i++) {
          const name = friendsList[i];
          if (!this.state.sharedWith.includes(name)) {
            notYetShared[name] = false;
          }
        }
        this.setState({ notYetShared });
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
    const sharedList = this.state.sharedWith.concat(notYetShared);
    const sharedWithList = { sharedWith: JSON.stringify(sharedList) };
    const req = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sharedWithList)
    };
    fetch(`/api/routes/sharedWith/${this.props.routeId}`, req)
      .then(res => {
        if (res.status === 204) {
          window.location.hash = `route-details?routeId=${this.props.routeId}`;
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  setLastWalked(lastWalked) {
    this.setState({ lastWalked });
  }

  setNextWalk(nextWalk) {
    this.setState({ nextWalk });
  }

  setModal(modalOpen) {
    this.setState({ modalOpen });
  }

  renderFriends() {
    const notYetShared = Object.keys(this.state.notYetShared).sort();
    if (notYetShared.length === 0) {
      return <p className="no-friends">No friends available to share this route with</p>;
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
          <AddDateButton setModal={this.setModal} />
          <div className="center input-div">
            <button className="button">Share</button>
          </div>
        </form>
        { this.state.modalOpen
          ? <AddDateForm routeId={this.props.routeId} setModal={this.setModal}
            lastWalked={this.state.lastWalked} setLastWalked={this.setLastWalked}
            nextWalk={this.state.nextWalk} setNextWalk={this.setNextWalk} />
          : ''
        }
      </div>
    );
  }
}
