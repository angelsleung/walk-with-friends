import React from 'react';

export default class Share extends React.Component {
  render() {
    return (
      <div className="page">
        <h1 className="page-title">Select Friend</h1>
        <div className="friend-list">
          <div className="friend-list-item">
            <input type="checkbox" className="checkbox" id="1" name="friend"></input>
            <label className="friend-label" htmlFor="1">
              <i className="friend-icon fas fa-user-circle"></i>
              <p className="friend-name">Misty</p>
            </label>
          </div>
          <div className="friend-list-item">
            <input type="checkbox" className="checkbox" id="2" name="friend"></input>
            <label className="friend-label" htmlFor="2">
              <i className="friend-icon fas fa-user-circle"></i>
              <p className="friend-name">Brock</p>
            </label>
          </div>
        </div>
        <div className="add-date-div">
          <i className="add-date-icon fas fa-calendar-plus"></i>
          <p className="add-date-text">Add a date</p>
        </div>
        <div className="center input-div">
          <a href="#route-details"><button className="button">Share</button></a>
        </div>
      </div>
    );
  }
}
