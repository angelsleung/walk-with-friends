import React from 'react';

export default class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { start: '' };
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {

  // }

  // handleSubmit(event) {
  //   event.preventDefault();
  // }

  render() {
    return (
      <form className="location-form">
        <h1 className="page-title">Map a Route</h1>
        <div className="input-div">
          <label htmlFor="start">Start (A)</label>
          <input type="text" value={this.state.startA} />
        </div>
        <div className="input-div">
          <label htmlFor="start">Stop (B)</label>
          <input type="text" value={this.state.stopB} />
        </div>
        <div className="input-div">
          <label htmlFor="start">Stop (C)</label>
          <input type="text" value={this.state.stopC} />
        </div>
        <div className="input-div">
          <label htmlFor="start">End (A)</label>
          <input type="text" value={this.state.startA} />
        </div>
        <div className="center input-div">
          <button className="go-button">Go</button>
        </div>
      </form>
    );
  }
}
