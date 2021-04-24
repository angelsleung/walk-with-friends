import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class AddFriend extends React.Component {
  render() {
    if (!this.context.user) return <Redirect to="log-in" />;

    return (
      <div className="page">
        <form className="add-friend-form">
          <h1 className="page-title">Add a Friend</h1>
          <input className="add-friend-input" placeholder="Username"></input>
          <button className="add-friend button">
            <i className="add-icon fas fa-user-plus" />
            Submit
          </button>
        </form>
      </div>
    );
  }
}

AddFriend.contextType = AppContext;
