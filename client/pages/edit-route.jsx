import React from 'react';

export default class EditRoute extends React.Component {
  render() {
    return (
      <div className="page">
        <h1 className="page-title">Edit Route</h1>
        <div className="friend-list">
        </div>
        <div className="add-date-div">
          <i className="add-date-icon fas fa-calendar-plus" />
          <p className="add-date-text">Add a date</p>
        </div>
        <div className="center input-div">
          <button className="button">Share</button>
        </div>
      </div>
    );
  }
}
