import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class FriendRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = { requests: [] };
    this.handleClickConfirm = this.handleClickConfirm.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  componentDidMount() {
    const { userId } = this.context.user;
    fetch(`/api/friendRequests/${userId}`)
      .then(res => res.json())
      .then(requests => {
        this.setState({ requests });
      });
  }

  handleClickConfirm() {
    this.handleClickDelete();
  }

  handleClickDelete(event) {
    const request = event.target.closest('.request-item');
    const { userId } = this.context.user;
    const friendUserId = parseInt(request.dataset.userId);
    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`/api/friendRequests/${userId}/${friendUserId}`, req)
      .then(res => {
        if (res.status !== 204) return;
        const requests = this.state.requests;
        for (let i = 0; i < requests.length; i++) {
          if (requests[i].userId === friendUserId) {
            requests.splice(i, 1);
            break;
          }
        }
        this.setState({ requests });
      })
      .catch(err => {
        console.error(err);
      });
  }

  renderRequests() {
    return (
      this.state.requests.map(request => {
        return (
          <div key={request.userId} className="request-item" data-user-id={request.userId}>
            <div className="contact-div">
              <i className="friend-icon fas fa-user-circle" />
              <span className="request-name">{request.name}</span>
            </div>
            <div className="request-buttons">
              <button className="confirm button" onClick={this.handleClickConfirm}>
                <i className="fas fa-user-plus" />
                <span className="request-text">Confirm</span>
              </button>
              <button className="delete button" onClick={this.handleClickDelete}>
                <i className="fas fa-user-slash" />
                <span className="request-text">Delete</span>
              </button>
            </div>
          </div>
        );
      })
    );
  }

  render() {
    if (!this.context.user) return <Redirect to="log-in" />;

    return (
      <div className="page">
        <h1 className="page-title">Friend Requests</h1>
        <div className="friend-requests">
          {this.renderRequests()}
        </div>
      </div>
    );
  }
}

FriendRequests.contextType = AppContext;
