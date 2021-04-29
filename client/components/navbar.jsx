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
            <li><a href="#" aria-label="Home"><i className="fas fa-home" /></a></li>
            <li><a href="#map-route" aria-label="Map Route"><i className="fas fa-map-marked-alt" /></a></li>
            <li><a href="#saved-routes" aria-label="Saved Routes"><i className="fas fa-heart" /></a></li>
            <li><AppDrawer aria-label="Menu"/></li>
          </ul>
        </nav>
      </footer>
    );
  }
}
