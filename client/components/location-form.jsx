import React from 'react';

export default class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return this.props;
  }
}
