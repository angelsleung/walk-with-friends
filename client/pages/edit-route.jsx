import React from 'react';

export default class EditRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedLastWalkedMinusIcon: false,
      clickedNextWalkMinusIcon: false

    };
    this.handleClickMinusIcon = this.handleClickMinusIcon.bind(this);
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this);
  }

  handleClickMinusIcon(event) {
    event.target.getAttribute('type') === 'lastWalked'
      ? this.setState({ clickedLastWalkedMinusIcon: true })
      : this.setState({ clickedNextWalkMinusIcon: true });
  }

  handleClickTrashIcon(event) {
    const type = event.target.getAttribute('type');
    const date = type === 'lastWalked'
      ? { lastWalked: '' }
      : { nextWalk: '' };
    const req = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(date)
    };
    fetch(`/api/routes/walkDate/${this.props.routeId}`, req)
      .then(res => {
        if (res.status === 204) {
          return 'something';
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="page">
        <h1 className="page-title">Edit Route</h1>
        <div className="edit-page">
          <div className="delete-icons">
            {this.state.clickedLastWalkedMinusIcon
              ? <i className="fas fa-trash-alt" type="lastWalked"
                onClick={this.handleClickTrashIcon} />
              : <i className="fas fa-minus-circle" type="lastWalked"
                onClick={this.handleClickMinusIcon} />
            }
            {this.state.clickedNextWalkMinusIcon
              ? <i className="fas fa-trash-alt" type="nextWalk"
                onClick={this.handleClickTrashIcon} />
              : <i className="fas fa-minus-circle" type="nextWalk"
                onClick={this.handleClickMinusIcon} />
            }
          </div>
          <div>
            <div className="edit-section">
              <h2>Last walked</h2>
              <p>4/1/21</p>
            </div>
            <div className="edit-section">
              <h2>Next walk</h2>
              <p>4/17/21 @ 2:00pm</p>
            </div>
            <div className="edit-section">
              <span className="delete-route">Delete Route</span>
            </div>
          </div>
        </div>
        <div className="center input-div">
          <button className="button">Done</button>
        </div>
      </div>
    );
  }
}
