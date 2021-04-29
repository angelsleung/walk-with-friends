import React from 'react';
import ErrorModal from '../components/error-modal';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      invalidLogin: false,
      errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setErrorModal = this.setErrorModal.bind(this);
  }

  componentDidMount() {
    if (!navigator.onLine) {
      this.setState({ errorMessage: 'network-error' });
    }
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
        if (result.user && result.token) {
          this.props.onSignIn(result);
        } else {
          this.setState({ invalidLogin: true });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ errorMessage: 'bad-request' });
      });
  }

  setErrorModal(errorMessage) {
    this.setState({ errorMessage });
  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const alternateActionHref = action === 'sign-up'
      ? '#log-in'
      : '#sign-up';
    const alternateActionText = action === 'sign-up'
      ? 'Log In'
      : 'Sign Up';
    const submitButtonText = action === 'sign-up'
      ? 'Sign Up'
      : 'Log In';
    const submitButtonClass = action === 'sign-up'
      ? 'sign-up'
      : 'log-in';
    const invalidLoginClass = this.state.invalidLogin
      ? ''
      : 'invisible';
    return (
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-input-div">
          <input required autoFocus type="text" name="username" className="auth-input"
            placeholder="Username" onChange={handleChange} value="demo" />
        </div>
        <div className="auth-input-div">
          <input required type="password" name="password" className="auth-input"
            placeholder="Password" onChange={this.handleChange} value="password" />
        </div>
          <p className={`invalid-login ${invalidLoginClass}`}>Invalid login</p>
        <div className="submit auth-input-div">
          <button type="submit" className={`auth-submit ${submitButtonClass}`}>
            {submitButtonText}
          </button>
        </div>
        <div className="alternate-action-div">
          <a href={alternateActionHref}>
            <p className="alternate-action">{alternateActionText}</p>
          </a>
        </div>
        { this.state.errorMessage
          ? <ErrorModal set={this.setErrorModal} message={this.state.errorMessage} />
          : ''
        }
      </form>
    );
  }
}
