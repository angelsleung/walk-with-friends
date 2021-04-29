import React from 'react';
import AppContext from '../lib/app-context';
import Spinner from '../components/spinner';
import Redirect from '../components/redirect';
import ErrorModal from '../components/error-modal';

export default class FriendRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      doneLoading: false,
      errorMessage: ''
    };
    this.handleClickConfirm = this.handleClickConfirm.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.setErrorModal = this.setErrorModal.bind(this);
  }

  componentDidMount() {
    if (!navigator.onLine) {
      this.setState({ errorMessage: 'network-error' });
    }
    const { userId } = this.context.user;
    fetch(`/api/friendRequests/${userId}`)
      .then(res => res.json())
      .then(requests => {
        this.setState({
          requests,
          doneLoading: true
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ errorMessage: 'bad-request' });
      });
  }

  handleClickConfirm(event) {
    const request = event.target.closest('.request-item');
    const friendUserId = parseInt(request.dataset.userId);
    const { userId } = this.context.user;
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, friendUserId })
    };
    fetch('api/friends', req)
      .then(res => {
        if (res.status === 201) {
          this.deleteRequest('accepted', friendUserId);
        } else {
          this.setState({ errorMessage: 'bad-request' });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ errorMessage: 'bad-request' });
      });

    req.body = JSON.stringify({
      userId: friendUserId,
      friendUserId: userId
    });
    fetch('api/friends', req)
      .then(res => {
        if (res.status === 201) {
          this.deleteRequest('accepted', friendUserId);
        } else {
          this.setState({ errorMessage: 'bad-request' });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ errorMessage: 'bad-request' });
      });
  }

  handleClickDelete(event) {
    const request = event.target.closest('.request-item');
    const requesterUserId = parseInt(request.dataset.userId);
    this.deleteRequest('deleted', requesterUserId);
  }

  deleteRequest(action, requesterUserId) {
    const { userId } = this.context.user;
    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`/api/friendRequests/${userId}/${requesterUserId}`, req)
      .then(res => {
        if (res.status === 204) {
          const requests = this.state.requests;
          for (let i = 0; i < requests.length; i++) {
            if (requests[i].userId === requesterUserId) {
              requests[i].message = `Request ${action}!`;
            }
          }
          this.setState({ requests });
        } else {
          this.setState({ errorMessage: 'bad-request' });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ errorMessage: 'bad-request' });
      });
  }

  setErrorModal(errorMessage) {
    this.setState({ errorMessage });
  }

  renderRequests() {
    if (this.state.requests.length === 0) {
      return <p className="no-requests">No new friend requests!</p>;
    }
    return (
      this.state.requests.map(request => {
        return (
          <li key={request.userId} className="request-item" data-user-id={request.userId}>
            <div className="contact-div">
              <i className="request-icon fas fa-user-circle" />
              <span className="request-name">{request.name}</span>
            </div>
            { request.message
              ? <div className="request-message">{request.message}</div>
              : <div className="request-buttons">
                <button className="confirm button" onClick={this.handleClickConfirm}>
                  <i className="fas fa-user-plus" />
                  <span className="request-text">Confirm</span>
                </button>
                <button className="delete button" onClick={this.handleClickDelete}>
                  <i className="fas fa-user-slash" />
                  <span className="request-text">Delete</span>
                </button>
              </div>
            }
          </li>
        );
      })
    );
  }

  render() {
    if (!this.context.user) return <Redirect to="log-in" />;

    return (
      <div className="fr page">
        <h1 className="page-title">Friend Requests</h1>
        { this.state.doneLoading
          ? <ul className="friend-requests">
              {this.renderRequests()}
            </ul>
          : <Spinner />
        }
        { this.state.errorMessage
          ? <ErrorModal message={this.state.errorMessage} set={this.setErrorModal} />
          : ''
        }
      </div>
    );
  }
}

FriendRequests.contextType = AppContext;
