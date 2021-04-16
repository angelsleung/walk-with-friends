import React from 'react';

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
    return (
      <div className="app-drawer">
        {this.state.isOpen
          ? <>
            <div className="menu">
              <h2>Menu</h2>
              <a onClick={this.handleClickExit} href="#"><p>Leaderboard</p></a>
              <a onClick={this.handleClickExit} href="#"><p>Map a Route</p></a>
              <a onClick={this.handleClickExit} href="#saved-routes"><p>Saved Routes</p></a>
              <a onClick={this.handleClickExit} href="#friends-routes"><p>{"My Friends' Routes"}</p></a>
            </div>
            <div className="overlay" onClick={this.handleClickExit} />
          </>
          : <i onClick={this.handleClickIcon} className='fas fa-bars' />
        }
      </div>
    );
  }
}
