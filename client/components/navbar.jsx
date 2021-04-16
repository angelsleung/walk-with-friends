import React from 'react';

export default function Navbar(props) {
  return (
    <footer className="navbar">
      <a href="#"><i className="fas fa-home"></i></a>
      <a href="#"><i className="fas fa-map-marked-alt"></i></a>
      <a href="#saved-routes"><i className="fas fa-heart"></i></a >
      <a href="#friends-routes"><i className="fas fa-user-friends"></i></a >
    </footer>
  );
}
