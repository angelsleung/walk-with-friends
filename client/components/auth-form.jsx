import React from 'react';

export default class AuthForm extends React.Component {
  render() {
    return (
      <form>
        <div>
          <label htmlFor="username" className="form-label">Username</label>
          <input required autoFocus id="username" type="text" name="username"></input>
        </div>
        <div>
          <label htmlFor="password" className="form-label">Password</label>
          <input required id="password" type="password" name="password"></input>
        </div>
        <div>
          <button type="submit"></button>
        </div>
      </form>
    );
  }
}
