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
      <form>
        <h1>Map a Route</h1>
        <div>
          <label htmlFor="start">Start (A)</label>
          <input type="text" value={this.state.startA} />
        </div>
        <div>
          <label htmlFor="start">Stop (B)</label>
          <input type="text" value={this.state.stopB} />
        </div>
        <div>
          <label htmlFor="start">Stop (C)</label>
          <input type="text" value={this.state.stopC} />
        </div>
        <button>Go</button>
      </form>
    );
  }
}
