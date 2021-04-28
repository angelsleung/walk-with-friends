import React from 'react';

export default class AddDateForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: null
    };
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
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
      this.props.setModal(false);
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
    fetch(`/api/routes/${this.props.routeId}`, req)
      .then(res => {
        if (res.status !== 204) return;
        type === 'lastWalked'
          ? this.props.setLastWalked(formattedDate)
          : this.props.setNextWalk(formattedDate);
        this.props.setModal(false);
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleCancel() {
    this.props.setModal(false);
  }

  render() {
    return (
      <>
        <div className="modal">
          <form className="add-date-form" onSubmit={this.handleSubmit}>
            <div className="date-label">
              <label htmlFor="date-time">Add a date and time</label>
            </div>
            <div>
              <input type="datetime-local" id="date-time" className="date-time"
                onChange={this.handleChangeDate} required></input>
            </div>
            <div className="date-button-div">
              <button onClick={this.handleCancel}
                className="date-button cancel">Cancel</button>
              <input type="submit" className="date-button save" value="Save" />
            </div>
          </form>
        </div>
        <div className="overlay" />
      </>
    );
  }

}
