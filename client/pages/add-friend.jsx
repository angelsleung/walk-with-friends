import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import Spinner from '../components/spinner';

export default class AddFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: '',
      doneLoading: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ doneLoading: false });
    fetch(`/api/users/${this.state.username}`)
      .then(res => res.json())
      .then(friend => {
        if (friend.length === 0) {
          this.setState({
            message: `No user with the username "${this.state.username}"`,
            username: '',
            doneLoading: true
          });
          return;
        }
        const [{ userId }] = friend;
        const requesterUserId = this.context.user.userId;
        const req = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, requesterUserId })
        };
        fetch('api/friendRequests', req)
          .then(res => {
            if (res.status === 201) {
              this.setState({
                message: `Sent a friend request to ${this.state.username}`,
                username: '',
                doneLoading: true
              });
            }
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (!this.context.user) return <Redirect to="log-in" />;

    return (
      <div className="add-friend page">
        <form className="add-friend-form" onSubmit={this.handleSubmit}>
          <h1 className="page-title">Add a Friend</h1>
          { this.state.doneLoading
            ? <>
                <input className="add-friend-input" type="text" value={this.state.username}
                  onChange={this.handleChange} placeholder="Username" required autoFocus />
                <p className="add-friend-message">{this.state.message}</p>
                <button className="add-friend button" type="submit">
                  <i className="add-icon fas fa-user-plus" />
                    Submit
                </button>
              </>
            : <Spinner />
          }
        </form>
      </div>
    );
  }
}

AddFriend.contextType = AppContext;
