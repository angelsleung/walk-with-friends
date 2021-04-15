import React from 'react';
import AddDateButton from '../components/add-date-button';
import formatDate from '../lib/format-date';

export default class EditRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastWalked: '',
      nextWalk: '',
      clickedLastWalked: false,
      clickedNextWalk: false
    };
    this.handleClickMinusIcon = this.handleClickMinusIcon.bind(this);
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this);
    this.setLastWalked = this.setLastWalked.bind(this);
    this.setNextWalk = this.setNextWalk.bind(this);
  }

  componentDidMount() {
    fetch(`/api/routes/${this.props.routeId}`)
      .then(res => res.json())
      .then(route => {
        this.setState({ lastWalked: route.lastWalked });
        this.setState({ nextWalk: route.nextWalk });
      });
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
            ? this.setState({ lastWalked: '' })
            : this.setState({ nextWalk: '' });
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

  setLastWalked(lastWalked) {
    this.setState({ lastWalked });
  }

  setNextWalk(nextWalk) {
    this.setState({ nextWalk });
  }

  render() {
    const lastWalkedClass = this.state.lastWalked ? '' : 'invisible';
    const nextWalkClass = this.state.nextWalk ? '' : 'invisible';
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
              { this.state.lastWalked
                ? <p>{formatDate(this.state.lastWalked)}</p>
                : <AddDateButton routeId={this.props.routeId}
                  lastWalked={this.state.lastWalked} setLastWalked={this.setLastWalked}
                  nextWalk={this.state.nextWalk} setNextWalk={this.setNextWalk} />
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
              { this.state.nextWalk
                ? <p>{formatDate(this.state.nextWalk)}</p>
                : <AddDateButton routeId={this.props.routeId}
                  lastWalked={this.state.lastWalked} setLastWalked={this.setLastWalked}
                  nextWalk={this.state.nextWalk} setNextWalk={this.setNextWalk} />
              }
            </div>
          </div>
          <div className="delete edit-row">
            <span className="delete-route">Delete Route</span>
          </div>
        </div>
        <div className="center input-div">
          <a href={`#route-details?routeId=${this.props.routeId}`}>
            <button className="button">Done</button>
            </a>
        </div>
      </div>
    );
  }
}
