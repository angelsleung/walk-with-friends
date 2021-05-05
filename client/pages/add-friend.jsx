import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import Spinner from '../components/spinner';
import ErrorModal from '../components/error-modal';

export default class AddFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: '',
      doneLoading: true,
      errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setErrorModal = this.setErrorModal.bind(this);
  }

  componentDidMount() {
    if (!navigator.onLine) {
      this.setState({ errorMessage: 'network-error' });
    }
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!navigator.onLine) {
      this.setState({ errorMessage: 'network-error' });
      return;
    }
    this.setState({ doneLoading: false });
    fetch(`/api/users/${this.state.username}`)
      .then(res => res.json())
      .then(friend => {
        if (friend.length === 0) {
          return {
            isHandled: true,
            message: `No user with the username "${this.state.username}"`
          };
        }
        const [{ userId }] = friend;
        const requesterUserId = this.context.user.userId;
        const req = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, requesterUserId })
        };
        return fetch('api/friendRequests', req);
      })
      .then(res => {
        let message = '';
        if (res.isHandled) {
          message = res.message;
        }
        if (res.status === 201) {
          message = `Sent a friend request to ${this.state.username}`;
        }
        this.setState({
          message,
          username: '',
          doneLoading: true
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ errorMessage: 'bad-request' });
      });
  }

  setErrorModal(errorMessage) {
    this.setState({ errorMessage });
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
        { this.state.errorMessage
          ? <ErrorModal message={this.state.errorMessage} set={this.setErrorModal} />
          : ''
        }
      </div>
    );
  }
}

AddFriend.contextType = AppContext;
