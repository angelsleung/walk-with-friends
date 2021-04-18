import React from 'react';

export default class AuthForm extends React.Component {
  render() {
    return (
      <form className="auth-form">
        <div className="auth-input-div">
          <input required autoFocus type="text" name="username"
            className="auth-input" placeholder="Username"></input>
        </div>
        <div className="auth-input-div">
          <input required type="password" name="password"
            className="auth-input" placeholder="Password"></input>
        </div>
        <div className="submit auth-input-div">
          <button type="submit" className="auth-submit">Log In</button>
        </div>
        <div className="sign-up-div">
          <p className="sign-up">Sign Up</p>
        </div>
      </form>
    );
  }
}
