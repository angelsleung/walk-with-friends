import React from 'react';
import AddDateButton from '../components/add-date-button';

export default class EditRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastWalkedClicks: 0,
      nextWalkClicks: 0
    };
    this.handleClickMinusIcon = this.handleClickMinusIcon.bind(this);
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this);
  }

  handleClickMinusIcon(event) {
    const type = event.target.getAttribute('type');
    type === 'lastWalked'
      ? this.setState({ lastWalkedClicks: 1 })
      : this.setState({ nextWalkClicks: 1 });
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
          type === 'lastWalked'
            ? this.setState({ lastWalkedClicks: 2 })
            : this.setState({ nextWalkClicks: 2 });

        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const lastWalkedIconClass = this.state.lastWalkedClicks === 2 ? 'invisible' : '';
    const nextWalkIconClass = this.state.nextWalkClicks === 2 ? 'invisible' : '';
    return (
      <div className="page">
        <h1 className="page-title">Edit Route</h1>
        <div className="edit-page">
          <div className="delete-icons">
            {this.state.lastWalkedClicks === 0
              ? <i className="fas fa-minus-circle" type="lastWalked"
                onClick={this.handleClickMinusIcon} />
              : <i className={`${lastWalkedIconClass} fas fa-trash-alt`} type="lastWalked"
                onClick={this.handleClickTrashIcon} />
            }
            {this.state.nextWalkClicks === 0
              ? <i className="fas fa-minus-circle" type="nextWalk"
                onClick={this.handleClickMinusIcon} />
              : <i className={`${nextWalkIconClass} fas fa-trash-alt`} type="nextWalk"
                onClick={this.handleClickTrashIcon} />
            }
          </div>
          <div>
            <div className="edit-section">
              <h2>Last walked</h2>
              { this.state.lastWalkedClicks < 2
                ? <p>{this.props.lastWalked}</p>
                : <AddDateButton routeId={this.props.routeId}
                  lastWalked={this.props.lastWalked} setLastWalked={this.props.setLastWalked}
                  nextWalk={this.props.nextWalk} setNextWalk={this.props.setNextWalk} />
              }
            </div>
            <div className="edit-section">
              <h2>Next walk</h2>
              { this.state.nextWalkClicks < 2
                ? <p>{this.props.nextWalk}</p>
                : <AddDateButton routeId={this.props.routeId}
                  lastWalked={this.props.lastWalked} setLastWalked={this.props.setLastWalked}
                  nextWalk={this.props.nextWalk} setNextWalk={this.props.setNextWalk} />
              }
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
