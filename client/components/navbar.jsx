import React from 'react';
import AppDrawer from './app-drawer';

export default function Navbar(props) {
  return (
    <footer className="navbar">
      <a href="#"><i className="fas fa-home"></i></a>
      <a href="#map-route"><i className="fas fa-map-marked-alt"></i></a>
      <a href="#saved-routes"><i className="fas fa-heart"></i></a >
      <AppDrawer />
    </footer>
  );
}
