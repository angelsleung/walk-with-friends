import React from 'react';

export default class SaveButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickSave = this.handleClickSave.bind(this);
  }

  handleClickSave() {
    this.props.onSave(!this.props.saved);
  }

  render() {
    const savedIconClass = this.props.saved ? 's' : 'r';
    const savedTextClass = this.props.saved ? 'd' : '';
    return (
      <div className="save-button" onClick={this.handleClickSave}>
        <i className={`save-icon fa${savedIconClass} fa-heart`}></i>
        <span className="button-text">{`Save${savedTextClass}`}</span>
      </div>
    );
  }
}
