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
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'log-in';
        } else if (result.user && result.token) {
          // console.log('result:', result);
          // console.log('result.user:', result.user);
          // console.log('result.token:', result.token);
          this.props.onSignIn(result);
        }
      });
  }

  render() {
    const { action } = this.props;
    const alternateActionHref = action === 'sign-up'
      ? '#log-in'
      : '#sign-up';
    const alternateActionText = action === 'sign-up'
      ? 'Log In'
      : 'Sign Up';
    const submitButtonText = action === 'sign-up'
      ? 'Sign Up'
      : 'Log In';
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
          <button type="submit" className="auth-submit">{submitButtonText}</button>
        </div>
        <div className="alternate-action-div">
          <a href={alternateActionHref}>
            <p className="alternate-action">{alternateActionText}</p>
          </a>
        </div>
      </form>
    );
  }
}
