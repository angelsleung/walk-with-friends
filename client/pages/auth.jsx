import React from 'react';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

export default class Auth extends React.Component {
  render() {
    // const { user, route, handleSignIn } = this.context;
    return (
      <AuthForm />
    );
  }
}

Auth.contextType = AppContext;
