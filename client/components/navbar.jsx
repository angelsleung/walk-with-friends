import React from 'react';
import AppDrawer from './app-drawer';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.isOpen) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <footer className="navbar" onClick={this.handleClick}>
        <a href="#"><i className="fas fa-home"></i></a>
        <a href="#map-route"><i className="fas fa-map-marked-alt"></i></a>
        <a href="#saved-routes"><i className="fas fa-heart"></i></a >
        <AppDrawer />
      </footer>
    );
  }
}
