import React from 'react';
import AddDateButton from '../components/add-date-button';
import AddDateForm from '../components/add-date-form';
import Redirect from '../components/redirect';
import Spinner from '../components/spinner';
import ErrorModal from '../components/error-modal';
import formatDate from '../lib/format-date';
import AppContext from '../lib/app-context';

export default class EditRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastWalked: '',
      nextWalk: '',
      clickedLastWalked: false,
      clickedNextWalk: false,
      clickedDeleteRoute: false,
      modalOpen: false,
      doneLoading: false

    };
    this.handleClickMinusDate = this.handleClickMinusDate.bind(this);
    this.handleClickTrashDate = this.handleClickTrashDate.bind(this);
    this.handleClickDeleteRoute = this.handleClickDeleteRoute.bind(this);
    this.handleClickTrashRoute = this.handleClickTrashRoute.bind(this);
    this.setLastWalked = this.setLastWalked.bind(this);
    this.setNextWalk = this.setNextWalk.bind(this);
    this.setDateModal = this.setDateModal.bind(this);
    this.setErrorModal = this.setErrorModal.bind(this);
  }

  componentDidMount() {
    if (!navigator.onLine) {
      this.setState({ errorMessage: 'network-error' });
      return;
    }
    fetch(`/api/routes/${this.props.routeId}`)
      .then(res => res.json())
      .then(route => {
        this.setState({
          lastWalked: route.lastWalked,
          nextWalk: route.nextWalk,
          doneLoading: true
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ errorMessage: 'bad-request' });
      });
  }

  handleClickMinusDate(event) {
    const type = event.target.dataset.type;
    type === 'lastWalked'
      ? this.setState({ clickedLastWalked: true })
      : this.setState({ clickedNextWalk: true });
  }

  handleClickTrashDate(event) {
    this.setState({ doneLoading: false });
    const type = event.target.dataset.type;
    const date = type === 'lastWalked'
      ? { lastWalked: '' }
      : { nextWalk: '' };
    const req = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(date)
    };
    fetch(`/api/routes/${this.props.routeId}`, req)
      .then(res => {
        if (res.status === 204) {
          type === 'lastWalked'
            ? this.setState({ lastWalked: '' })
            : this.setState({ nextWalk: '' });
          this.setState({
            clickedLastWalked: false,
            clickedNextWalk: false,
            doneLoading: true
          });
        } else {
          this.setState({ errorMessage: 'bad-request' });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ errorMessage: 'bad-request' });
      });
  }

  handleClickDeleteRoute() {
    this.setState({ clickedDeleteRoute: true });
  }

  handleClickTrashRoute() {
    this.setState({ doneLoading: false });
    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`/api/routes/${this.props.routeId}`, req)
      .then(res => {
        if (res.status === 204) {
          window.location.hash = 'saved-routes';
        } else {
          this.setState({ errorMessage: 'bad-request' });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ errorMessage: 'bad-request' });
      });
  }

  setLastWalked(lastWalked) {
    this.setState({ lastWalked });
  }

  setNextWalk(nextWalk) {
    this.setState({ nextWalk });
  }

  setDateModal(modalOpen) {
    this.setState({ modalOpen });
  }

  setErrorModal(errorMessage) {
    this.setState({ errorMessage });
  }

  render() {
    if (!this.context.user) return <Redirect to="log-in" />;

    const lastWalkedClass = this.state.lastWalked ? '' : 'invisible';
    const nextWalkClass = this.state.nextWalk ? '' : 'invisible';
    const deleteRouteClass = this.state.clickedDeleteRoute ? '' : 'invisible';
    return (
      <div className="page">
        <h1 className="page-title">Edit Route</h1>
        { this.state.doneLoading
          ? <>
              <div className="edit-content">
                <h2 className="edit-header">Last walked</h2>
                <div className="edit-row">
                  {this.state.lastWalked
                    ? <>
                      <i className={`${lastWalkedClass} fas fa-${this.state.clickedLastWalked ? 'trash-alt' : 'minus-circle'}`}
                        onClick={this.state.clickedLastWalked ? this.handleClickTrashDate : this.handleClickMinusDate}
                        data-type="lastWalked" />
                      <p>{formatDate(this.state.lastWalked)}</p>
                    </>
                    : <AddDateButton setModal={this.setDateModal} />
                  }
                </div>
                <h2 className="edit-header">Next walk</h2>
                <div className="edit-row">
                  {this.state.nextWalk
                    ? <>
                      <i className={`${nextWalkClass} fas fa-${this.state.clickedNextWalk ? 'trash-alt' : 'minus-circle'}`}
                        onClick={this.state.clickedNextWalk ? this.handleClickTrashDate : this.handleClickMinusDate}
                        data-type="nextWalk" />
                      <p>{formatDate(this.state.nextWalk)}</p>
                    </>
                    : <AddDateButton setModal={this.setDateModal} />
                  }
                </div>
                <div className="edit-row delete-row">
                  <i className={`${deleteRouteClass} delete-route-icon fas fa-trash-alt`} data-type="nextWalk"
                    onClick={this.handleClickTrashRoute} />
                  <div className="delete-route" onClick={this.handleClickDeleteRoute}>
                    Delete Route
                    </div>
                </div>
              </div>
              <div className="center input-div">
                <a href={`#route-details?routeId=${this.props.routeId}`}>
                  <button className="button">Done</button>
                </a>
              </div>
            </>
          : <Spinner />
        }
        { this.state.modalOpen
          ? <AddDateForm routeId={this.props.routeId} setModal={this.setDateModal}
            lastWalked={this.state.lastWalked} setLastWalked={this.setLastWalked}
            nextWalk={this.state.nextWalk} setNextWalk={this.setNextWalk} />
          : ''
        }
        { this.state.errorMessage
          ? <ErrorModal set={this.setErrorModal} message={this.state.errorMessage} />
          : ''
        }
      </div>
    );
  }
}

EditRoute.contextType = AppContext;
