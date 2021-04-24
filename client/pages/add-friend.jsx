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
          <input></input>
          <submit></submit>
        </form>
      </div>
    );
  }
}

AddFriend.contextType = AppContext;
