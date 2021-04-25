import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class FriendRequests extends React.Component {
  render() {

    if (!this.context.user) return <Redirect to="log-in" />;

    return (
      <div className="page">
        <h1 className="page-title">Friend Requests</h1>
        <div className="friend-requests">
          <div className="request-item">
            <div className="contact-div">
              <i className="friend-icon fas fa-user-circle" />
              <span className="request-name">Gary</span>
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
          <div className="request-item">
            <div className="contact-div">
              <i className="friend-icon fas fa-user-circle" />
              <span className="request-name">Oak</span>
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
        </div>
      </div>
    );
  }
}

FriendRequests.contextType = AppContext;
