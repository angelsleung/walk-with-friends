import React from 'react';
import AddDateButton from '../components/add-date-button';
import AddDateForm from '../components/add-date-form';
import formatDate from '../lib/format-date';

export default class EditRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastWalked: '',
      nextWalk: '',
      clickedLastWalked: false,
      clickedNextWalk: false,
      clickedDeleteRoute: false,
      modalOpen: false
    };
    this.handleClickMinusDate = this.handleClickMinusDate.bind(this);
    this.handleClickTrashDate = this.handleClickTrashDate.bind(this);
    this.handleClickDeleteRoute = this.handleClickDeleteRoute.bind(this);
    this.handleClickTrashRoute = this.handleClickTrashRoute.bind(this);
    this.setLastWalked = this.setLastWalked.bind(this);
    this.setNextWalk = this.setNextWalk.bind(this);
    this.setModal = this.setModal.bind(this);
  }

  componentDidMount() {
    fetch(`/api/routes/${this.props.routeId}`)
      .then(res => res.json())
      .then(route => {
        this.setState({ lastWalked: route.lastWalked });
        this.setState({ nextWalk: route.nextWalk });
      });
  }

  handleClickMinusDate(event) {
    const type = event.target.getAttribute('type');
    type === 'lastWalked'
      ? this.setState({ clickedLastWalked: true })
      : this.setState({ clickedNextWalk: true });
  }

  handleClickTrashDate(event) {
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

  handleClickDeleteRoute() {
    this.setState({ clickedDeleteRoute: true });
  }

  handleClickTrashRoute() {
    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`/api/routes/${this.props.routeId}`, req)
      .then(res => {
        if (res.status === 204) {
          window.location.hash = 'saved-routes';
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

  setModal(modalOpen) {
    this.setState({ modalOpen });
  }

  render() {
    const lastWalkedClass = this.state.lastWalked ? '' : 'invisible';
    const nextWalkClass = this.state.nextWalk ? '' : 'invisible';
    const deleteRouteClass = this.state.clickedDeleteRoute ? '' : 'invisible';
    return (
      <div className="page">
        <h1 className="page-title">Edit Route</h1>
        <div className="edit-page">
          <div className="edit-row">
            { this.state.clickedLastWalked
              ? <i className={`${lastWalkedClass} fas fa-trash-alt`} type="lastWalked"
              onClick={this.handleClickTrashDate} />
              : <i className={`${lastWalkedClass} fas fa-minus-circle`} type="lastWalked"
              onClick={this.handleClickMinusDate} />
            }
            <div className="edit-section">
              <h2>Last walked</h2>
              { this.state.lastWalked
                ? <p>{formatDate(this.state.lastWalked)}</p>
                : <AddDateButton setModal={this.setModal} />
              }
            </div>
          </div>
          <div className="edit-row">
            { this.state.clickedNextWalk
              ? <i className={`${nextWalkClass} fas fa-trash-alt`} type="nextWalk"
              onClick={this.handleClickTrashDate} />
              : <i className={`${nextWalkClass} fas fa-minus-circle`} type="nextWalk"
              onClick={this.handleClickMinusDate} />
            }
            <div className="edit-section">
              <h2>Next walk</h2>
              { this.state.nextWalk
                ? <p>{formatDate(this.state.nextWalk)}</p>
                : <AddDateButton setModal={this.setModal} />
              }
            </div>
          </div>
          <div className="edit-row">
            <i className={`${deleteRouteClass} fas fa-trash-alt`} type="nextWalk"
              onClick={this.handleClickTrashRoute} />
            <div className="edit-section">
              <span className="delete-route" onClick={this.handleClickDeleteRoute}>
                Delete Route
              </span>
            </div>
          </div>
        </div>
        <div className="center input-div">
          <a href={`#route-details?routeId=${this.props.routeId}`}>
            <button className="button">Done</button>
            </a>
        </div>
        { this.state.modalOpen
          ? <AddDateForm routeId={this.props.routeId} setModal={this.setModal}
            lastWalked={this.state.lastWalked} setLastWalked={this.setLastWalked}
            nextWalk={this.state.nextWalk} setNextWalk={this.setNextWalk} />
          : ''
        }
      </div>
    );
  }
}
