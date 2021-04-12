import React from 'react';

export default class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.handleClickIcon = this.handleClickIcon.bind(this);
    this.handleClickOverlay = this.handleClickOverlay.bind(this);
  }

  handleClickIcon() {
    this.setState({ isOpen: true });
  }

  handleClickOverlay() {
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <div className="app-drawer">
        {this.state.isOpen
          ? <>
              <div className="menu">
                <h2>Menu</h2>
                <a href="#"><p>Leaderboard</p></a>
                <a href="#"><p>Map a Route</p></a>
                <a href="#saved-routes"><p>Saved Routes</p></a>
                <a href="#"><p>{"My Friends' Routes"}</p></a>
              </div>
              <div className="overlay" onClick={this.handleClickOverlay} />
            </>
          : <i onClick={this.handleClickIcon} className='fas fa-bars' />
        }
      </div>
    );
  }
}
