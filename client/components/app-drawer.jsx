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
    const menuClass = this.state.isOpen ? '' : 'hidden';
    return (
      <div className="app-drawer">
        <div className={`menu ${menuClass}`}>
          <ul><h2>Menu</h2></ul>
          <a onClick={this.handleClickExit} href="#"><li>Leaderboard</li></a>
          <a onClick={this.handleClickExit} href="#map-route"><li>Map a Route</li></a>
          <a onClick={this.handleClickExit} href="#saved-routes"><li>Saved Routes</li></a>
          <a onClick={this.handleClickExit} href="#friends-routes"><li>{"My Friends' Routes"}</li></a>
          <a onClick={this.handleClickExit} href="#add-friend"><li>Add a Friend</li></a>
          <a onClick={this.handleClickExit} href="#friend-requests"><li>Friend Requests</li></a>
          <a onClick={() => {
            handleSignOut();
            this.handleClickExit();
          }} href="#">
            <li>Sign Out</li>
          </a>
        </div>
        <div className={`overlay ${menuClass}`} onClick={this.handleClickExit} />
        <i onClick={this.handleClickIcon} className={`fas fa-bars bars-icon ${iconClass}`} />
        {this.state.isOpen ? <Navbar onClick={this.handleClickExit} isOpen={this.state.isOpen}/> : ''}
      </div>
    );
  }
}

AppDrawer.contextType = AppContext;
