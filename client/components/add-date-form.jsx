import React from 'react';

export default class AddDateForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { date: null };
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChangeDate(event) {
    const date = event.target.value;
    this.setState({ date });
  }

  handleSubmit() {
    event.preventDefault();
    const parsedDate = Date.parse(this.state.date);
    const type = parsedDate <= Date.now() ? 'lastWalked' : 'nextWalk';
    const existingDate = Date.parse(this.props[type]);
    if ((type === 'lastWalked' && existingDate >= parsedDate) ||
      (type === 'nextWalk' && existingDate <= parsedDate)) {
      this.handleClose();
      return;
    }
    const formattedDate = new Date(parsedDate);
    const date = parsedDate <= Date.now()
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
          this.handleClose();
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleClose() {
    this.props.toggle(false);
  }

  render() {
    return (
      <>
        <div className="modal">
          <form className="add-date-form" onSubmit={this.handleSubmit}>
            <div className="date-label">
              <label htmlFor="date-time">Date & Time</label>
            </div>
            <div>
              <input type="datetime-local" id="date-time" className="date-time"
                onChange={this.handleChangeDate}></input>
            </div>
            <div className="date-button-div">
              <button onClick={this.handleClose}
                className="date-button cancel">Cancel</button>
              <button className="date-button save">Save</button>
            </div>
          </form>
        </div>
        <div className="overlay" />
      </>
    );
  }
}
