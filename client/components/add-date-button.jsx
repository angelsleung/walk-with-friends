import React from 'react';

export default class AddDateForm extends React.Component {
  render() {
    return (
      <div className="add-date-div" onClick={this.handleAddDate}>
        <i className="add-date-icon fas fa-calendar-plus" />
        <p className="add-date-text">Add a date</p>
      </div>
    );
  }
}
