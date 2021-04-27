import React from 'react';
import AddDateButton from '../components/add-date-button';
import AddDateForm from '../components/add-date-form';
import Redirect from '../components/redirect';
import Spinner from '../components/spinner';
import AppContext from '../lib/app-context';

export default class ShareRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notYetShared: [],
      lastWalked: '',
      nextWalk: '',
      modalOpen: false,
      doneLoading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setLastWalked = this.setLastWalked.bind(this);
    this.setNextWalk = this.setNextWalk.bind(this);
    this.setModal = this.setModal.bind(this);
  }

  componentDidMount() {
    const { userId } = this.context.user;
    fetch(`/api/friends/${userId}`)
      .then(res => res.json())
      .then(friends => {
        fetch(`/api/sharedRoutes/${this.props.routeId}`)
          .then(res => res.json())
          .then(sharedWith => {
            const sharedWithUserIds = {};
            for (let i = 0; i < sharedWith.length; i++) {
              sharedWithUserIds[sharedWith[i].userId] = true;
            }
            const notYetShared = friends.filter(friend => !sharedWithUserIds[friend.userId]);
            this.setState({
              notYetShared,
              doneLoading: true
            });
          });
      });
  }

  handleChange(event) {
    const userId = parseInt(event.target.value);
    const notYetShared = this.state.notYetShared;
    for (let i = 0; i < notYetShared.length; i++) {
      if (notYetShared[i].userId === userId) {
        notYetShared[i].selected = event.target.checked;
      }
    }
    this.setState({ notYetShared });
  }

  handleSubmit(event) {
    event.preventDefault();
    for (let i = 0; i < this.state.notYetShared.length; i++) {
      const friend = this.state.notYetShared[i];
      if (!friend.selected) continue;
      const req = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: friend.userId })
      };
      fetch(`/api/sharedRoutes/${this.props.routeId}`, req)
        .catch(err => {
          console.error(err);
        });
    }
    window.location.hash = `route-details?routeId=${this.props.routeId}`;
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
    if (this.state.notYetShared.length === 0) {
      return <p className="no-friends">No friends available to share this route with</p>;
    }
    return (
      this.state.notYetShared.sort((a, b) => a.name > b.name ? 1 : -1).map(friend => {
        return (
          <li key={friend.userId} className="friend-list-item">
            <input type="checkbox" className="checkbox" id={friend.userId} name="friend"
              value={friend.userId} onChange={this.handleChange}/>
            <label className="friend-label" htmlFor={friend.userId}>
              <i className="friend-icon fas fa-user-circle" />
              <p className="friend-name">{friend.name}</p>
            </label>
          </li>
        );
      })
    );
  }

  render() {
    if (!this.context.user) return <Redirect to="log-in" />;

    return (
      <div className="page">
        <form className="share-form" onSubmit={this.handleSubmit}>
          <h1 className="page-title">Select Friend</h1>
          { this.state.doneLoading
            ? <ul className="friend-list">
                {this.renderFriends()}
              </ul>
            : <Spinner />
          }
          <AddDateButton setModal={this.setModal} />
          <div className="center input-div">
            <button className="button" type="submit">Share</button>
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

ShareRoute.contextType = AppContext;
