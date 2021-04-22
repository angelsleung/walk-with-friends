import React from 'react';
import AppContext from '../lib/app-context';
import Navbar from './navbar';

export default class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.handleClickIcon = this.handleClickIcon.bind(this);
    this.handleClickExit = this.handleClickExit.bind(this);
    // this.setModal = this.setModal.bind(this);
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
          <h2>Menu</h2>
          <a onClick={this.handleClickExit} href="#"><p>Leaderboard</p></a>
          <a onClick={this.handleClickExit} href="#map-route"><p>Map a Route</p></a>
          <a onClick={this.handleClickExit} href="#saved-routes"><p>Saved Routes</p></a>
          <a onClick={this.handleClickExit} href="#friends-routes"><p>{"My Friends' Routes"}</p></a>
          <a onClick={() => {
            handleSignOut();
            this.handleClickExit();
          }} href="#">
            <p>Sign Out</p>
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
