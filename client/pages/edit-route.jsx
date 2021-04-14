import React from 'react';

export default class EditRoute extends React.Component {
  render() {
    return (
      <div className="page">
        <h1 className="page-title">Edit Route</h1>
        <div className="edit-page">
          <div className="delete-icons">
            <i className="fas fa-minus-circle"></i>
            <i className="fas fa-minus-circle"></i>
          </div>
          <div>
            <div className="edit-section">
              <h2>Last walked</h2>
              <p>4/1/21</p>
            </div>
            <div className="edit-section">
              <h2>Next walk</h2>
              <p>4/17/21 @ 2:00pm</p>
            </div>
            <div className="edit-section">
              <span className="delete-route">Delete Route</span>
            </div>
          </div>
        </div>
        <div className="center input-div">
          <button className="button">Done</button>
        </div>
      </div>
    );
  }
}
