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
    const errorTitle = this.props.message === 'bad-request'
      ? 'Bad Request'
      : 'Network Error';
    const errorMessage = this.props.message === 'bad-request'
      ? 'Sorry, there was a database error.'
      : 'Poor network connection.';
    return (
      this.props.message
        ? <div className="error-modal">
            <div className="exit-div">
              <i className="fas exit fa-times" onClick={this.handleClickExit} />
            </div>
            <h3 className="error-title">{errorTitle}</h3>
            <p className="error-message">{errorMessage}</p>
            <p>Please try again.</p>
          </div>
        : ''
    );
  }
}
