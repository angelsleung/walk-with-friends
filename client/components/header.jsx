import React from 'react';
import AppDrawer from './app-drawer';

export default function Header(props) {
  return (
    <header>
      <AppDrawer />
      <div className="app-name">
        <a href="#"><h1>Walk with Friends</h1></a>
      </div>
    </header>
  );
}
