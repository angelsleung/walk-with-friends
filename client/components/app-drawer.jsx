import React from 'react';
import AppContext from '../lib/app-context';
import Navbar from './navbar';

export default class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.handleClickIcon = this.handleClickIcon.bind(this);
    this.handleClickExit = this.handleClickExit.bind(this);
  }

  handleClickIcon() {
    this.setState({ isOpen: true });
  }

  handleClickExit() {
    this.setState({ isOpen: false });
  }

  render() {
    const { handleSignOut } = this.context;
    const iconClass = this.state.isOpen ? 'hide' : '';
    const menuClass = this.state.isOpen ? 'open' : '';
    const overlayClass = this.state.isOpen ? '' : 'hidden';
    return (
      <div className="app-drawer">
        <nav className={`menu ${menuClass}`}>
          <h2>Menu</h2>
          <ul>
            <li><a onClick={this.handleClickExit} href="#">Distance Leaderboard</a></li>
            <li><a onClick={this.handleClickExit} href="#map-route">Map a Route</a></li>
            <li><a onClick={this.handleClickExit} href="#saved-routes">Saved Routes</a></li>
            <li><a onClick={this.handleClickExit} href="#friends-routes">{"My Friends' Routes"}</a></li>
            <li><a onClick={this.handleClickExit} href="#add-friend">Add a Friend</a></li>
            <li><a onClick={this.handleClickExit} href="#friend-requests">Friend Requests</a></li>
            <li><a onClick={() => {
              handleSignOut();
              this.handleClickExit();
            }} href="#">Sign Out</a></li>
          </ul>
        </nav>
      <div className={`overlay ${overlayClass}`} onClick={this.handleClickExit} />
      <div className={`navbar-div ${iconClass}`} onClick={this.handleClickIcon}>
        <i className="fas fa-bars bars-icon" />
        <span className="nav-label">menu</span>
      </div>
      {this.state.isOpen ? <Navbar onClick={this.handleClickExit} isOpen={this.state.isOpen}/> : ''}
    </div>
    );
  }
}

AppDrawer.contextType = AppContext;
