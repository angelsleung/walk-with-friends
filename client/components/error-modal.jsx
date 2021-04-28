import React from 'react';

export default class ErrorModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickExit = this.handleClickExit.bind(this);
  }

  handleClickExit() {
    this.props.set(false);
  }

  render() {
    return (
      this.props.isOpen
        ? <div className="error-modal">
            <div className="exit-div">
              <i className="fas exit fa-times" onClick={this.handleClickExit} />
            </div>
            <h3 className="error-title">Network Error</h3>
            <p className="error-message">Poor network connection.</p>
            <p>Please try again.</p>
          </div>
        : ''
    );
  }
}
