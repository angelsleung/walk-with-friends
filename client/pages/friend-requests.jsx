import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class FriendRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = { requests: [] };
  }

  componentDidMount() {
    const { userId } = this.context.user;
    fetch(`/api/friendRequests/${userId}`)
      .then(res => res.json())
      .then(requests => {
        this.setState({ requests });
      });
  }

  renderRequests() {
    return (
      this.state.requests.map(request => {
        return (
          <div key={request.userId} className="request-item">
            <div className="contact-div">
              <i className="friend-icon fas fa-user-circle" />
              <span className="request-name">{request.name}</span>
            </div>
            <div className="request-buttons">
              <button className="confirm button">
                <i className="fas fa-user-plus" />
                <span className="request-text">Confirm</span>
              </button>
              <button className="delete button">
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
