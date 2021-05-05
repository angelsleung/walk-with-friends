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
      <footer>
        <nav className="navbar" onClick={this.handleClick}>
          <ul className="nav-list">
            <li>
              <a href="#" aria-label="Home">
                <div className="navbar-div">
                  <i className="fas fa-home" />
                  <span className="nav-label">home</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#map-route" aria-label="Map Route">
                <div className="navbar-div">
                  <i className="fas fa-map-marked-alt" />
                  <span className="nav-label">new</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#saved-routes" aria-label="Saved Routes">
                <div className="navbar-div">
                  <i className="fas fa-heart" />
                  <span className="nav-label">saved</span>
                </div>
              </a>
            </li>
            <li>
              <AppDrawer aria-label="Menu"/>
            </li>
          </ul>
        </nav>
      </footer>
    );
  }
}
