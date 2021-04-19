import React from 'react';
import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

export default class Auth extends React.Component {
  render() {
    const { user, route, handleSignIn } = this.context;

    if (user) return <Redirect to="" />;

    return (
      <div className="auth-page">
        <h1 className="auth-app-name">Walk with Friends</h1>
        <AuthForm key={route.path} action={route.path} onSignIn={handleSignIn}/>
        <div className="auth-text">
          <p>Because walks are more fun with friends!</p>
          <div className="auth-icons">
            <i className="shoes fas fa-shoe-prints"></i>
            <i className="shoes fas fa-shoe-prints"></i>
          </div>
        </div>
      </div>
    );
  }
}

Auth.contextType = AppContext;
