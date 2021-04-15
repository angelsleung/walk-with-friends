import React from 'react';
import AddDateButton from '../components/add-date-button';

export default class EditRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedLastWalked: false,
      clickedNextWalk: false
    };
    this.handleClickMinusIcon = this.handleClickMinusIcon.bind(this);
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this);
  }

  handleClickMinusIcon(event) {
    const type = event.target.getAttribute('type');
    type === 'lastWalked'
      ? this.setState({ clickedLastWalked: true })
      : this.setState({ clickedNextWalk: true });
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
            ? this.props.setLastWalked('')
            : this.props.setNextWalk('');
          this.setState({
            clickedLastWalked: false,
            clickedNextWalk: false
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const lastWalkedClass = this.props.lastWalked ? '' : 'invisible';
    const nextWalkClass = this.props.nextWalk ? '' : 'invisible';
    return (
      <div className="page">
        <h1 className="page-title">Edit Route</h1>
        <div className="edit-page">
          <div className="edit-row">
            { this.state.clickedLastWalked
              ? <i className={`${lastWalkedClass} fas fa-trash-alt`} type="lastWalked"
              onClick={this.handleClickTrashIcon} />
              : <i className={`${lastWalkedClass} fas fa-minus-circle`} type="lastWalked"
              onClick={this.handleClickMinusIcon} />
            }
            <div className="edit-section">
              <h2>Last walked</h2>
              { this.props.lastWalked
                ? <p>{this.props.lastWalked}</p>
                : <AddDateButton routeId={this.props.routeId}
                  lastWalked={this.props.lastWalked} setLastWalked={this.props.setLastWalked}
                  nextWalk={this.props.nextWalk} setNextWalk={this.props.setNextWalk} />
              }
            </div>
          </div>
          <div className="edit-row">
            { this.state.clickedNextWalk
              ? <i className={`${nextWalkClass} fas fa-trash-alt`} type="nextWalk"
              onClick={this.handleClickTrashIcon} />
              : <i className={`${nextWalkClass} fas fa-minus-circle`} type="nextWalk"
              onClick={this.handleClickMinusIcon} />
            }
            <div className="edit-section">
              <h2>Next walk</h2>
              { this.props.nextWalk
                ? <p>{this.props.nextWalk}</p>
                : <AddDateButton routeId={this.props.routeId}
                  lastWalked={this.props.lastWalked} setLastWalked={this.props.setLastWalked}
                  nextWalk={this.props.nextWalk} setNextWalk={this.props.setNextWalk} />
              }
            </div>
          </div>
          <div className="delete edit-row">
            <span className="delete-route">Delete Route</span>
          </div>
        </div>
        <div className="center input-div">
          <a href="#route-details"><button className="button">Done</button></a>
        </div>
      </div>
    );
  }
}
