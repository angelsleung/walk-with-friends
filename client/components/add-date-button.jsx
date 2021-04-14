import React from 'react';

export default class AddDateButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: null,
      modalOpen: false
    };
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleChangeDate(event) {
    const date = event.target.value;
    this.setState({ date });
  }

  handleSave() {
    const parsedDate = Date.parse(this.state.date);
    const type = parsedDate <= Date.now() ? 'lastWalked' : 'nextWalk';
    const existingDate = Date.parse(this.props[type]);
    if ((type === 'lastWalked' && existingDate >= parsedDate) ||
      (type === 'nextWalk' && existingDate <= parsedDate)) {
      this.setState({ modalOpen: false });
      return;
    }
    const formattedDate = new Date(parsedDate).toString();
    const date = type === 'lastWalked'
      ? { lastWalked: formattedDate }
      : { nextWalk: formattedDate };
    const req = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(date)
    };
    fetch(`/api/routes/walkDate/${this.props.routeId}`, req)
      .then(res => {
        if (res.status === 204) {
          this.setState({ modalOpen: false });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleOpenModal() {
    this.setState({ modalOpen: true });
  }

  handleCloseModal() {
    this.setState({ modalOpen: false });
  }

  renderButton() {
    return (
      <div className="add-date-div" onClick={this.handleOpenModal}>
        <i className="add-date-icon fas fa-calendar-plus" />
        <p className="add-date-text">Add a date</p>
      </div>
    );
  }

  renderModal() {
    return (
      <>
        <div className="modal">
          <div className="add-date-form">
            <div className="date-label">
              <label htmlFor="date-time">Add a date and time</label>
            </div>
            <div>
              <input type="datetime-local" id="date-time" className="date-time"
                onChange={this.handleChangeDate}></input>
            </div>
            <div className="date-button-div">
              <button onClick={this.handleCloseModal}
                className="date-button cancel">Cancel</button>
              <button className="date-button save"
                onClick={this.handleSave} >Save</button>
            </div>
          </div>
        </div>
        <div className="overlay" onClick={this.handleCloseModal} />
      </>
    );
  }

  render() {
    return (
      <>
        {this.renderButton()}
        {this.state.modalOpen ? this.renderModal() : ''}
      </>
    );
  }
}
