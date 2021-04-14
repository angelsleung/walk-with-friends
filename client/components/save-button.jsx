import React from 'react';

export default class SaveButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickSave = this.handleClickSave.bind(this);
  }

  handleClickSave() {
    this.props.onSave(!this.props.isSaved);
  }

  render() {
    const savedIconClass = this.props.isSaved ? 's' : 'r';
    const savedTextClass = this.props.isSaved ? 'd' : '';
    return (
      <div className="option-button save-button" onClick={this.handleClickSave}>
        <i className={`save-icon fa${savedIconClass} fa-heart`} />
        <span className="button-text">{`Save${savedTextClass}`}</span>
      </div>
    );
  }
}
