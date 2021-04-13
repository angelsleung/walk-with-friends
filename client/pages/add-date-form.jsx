import React from 'react';

export default class AddDateForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { date: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const date = event.target.value;
    this.setState({ date });
  }

  handleSubmit() {
    event.preventDefault();
  }

  render() {
    return (
      <div className="page">
        <form className="add-date-form" onSubmit={this.handleSubmit}>
          <h1 className="page-title">Add Date and Time</h1>
          <div>
            <label htmlFor="date-time">Date & Time</label>
            <input type="datetime-local" id="date-time"></input>
          </div>
          <div className="center input-div">
            <button className="button">Save</button>
          </div>
        </form>
      </div>
    );
  }
}
