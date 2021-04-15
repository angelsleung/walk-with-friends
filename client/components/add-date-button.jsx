import React from 'react';

export default class AddDateButton extends React.Component {

  constructor(props) {
    super(props);
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  handleOpenModal() {
    this.props.setModal(true);
  }

  render() {
    return (
      <div className="add-date-div" onClick={this.handleOpenModal}>
        <i className="add-date-icon fas fa-calendar-plus" />
        <p className="add-date-text">Add a date</p>
      </div>
    );
  }
}
