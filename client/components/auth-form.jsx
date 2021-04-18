import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form className="auth-form" onSubmit={this.handleSubmit}>
        <div className="auth-input-div">
          <input required autoFocus type="text" name="username" className="auth-input"
            placeholder="Username" onChange={this.handleChange}></input>
        </div>
        <div className="auth-input-div">
          <input required type="password" name="password" className="auth-input"
            placeholder="Password" onChange={this.handleChange}></input>
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
