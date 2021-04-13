import React from 'react';

export default class Share extends React.Component {
  render() {
    return (
      <div className="page">
        <h1 className="page-title">Select Friend</h1>
        <div className="friend-list">
        </div>
        <div className="center input-div">
          <button className="button">Share</button>
        </div>
      </div>
    );
  }
}
