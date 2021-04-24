import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class FriendRequests extends React.Component {
  render() {
    if (!this.context.user) return <Redirect to="log-in" />;

    return (
      <div className="page">
        <div className = "friend-requests">
          <h1 className="page-title">Friend Requests</h1>
        </div>
      </div>
    );
  }
}

FriendRequests.contextType = AppContext;
