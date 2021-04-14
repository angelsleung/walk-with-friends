import React from 'react';

export default class AddDateForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { date: null };
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

  }

  handleCancel() {
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
              <button onClick={this.handleCancel}
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
