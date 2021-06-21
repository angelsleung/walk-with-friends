import React, { useEffect, useState } from 'react';
import AddDateButton from '../components/add-date-button';
import AddDateForm from '../components/add-date-form';
import Redirect from '../components/redirect';
import Spinner from '../components/spinner';
import ErrorModal from '../components/error-modal';
import AppContext from '../lib/app-context';

export default function ShareRoute () {
  const [notYetShared, setNotYetShared] = useState([]);
  const [lastWalked, setLastWalked] = useState('');
  const [nextWalk, setNetWalk] = useState('');
  const [dateOpen, setDateOpen] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!navigator.onLine) {
      setErrorMessage('network-error');
      return;
    }
    const { userId } = this.context.user;
    fetch(`/api/friends/${userId}`)
      .then(res => res.json())
      .then(friends => {
        fetch(`/api/sharedRoutes/${this.props.routeId}`)
          .then(res => res.json())
          .then(sharedWith => {
            const sharedWithUserIds = {};
            for (let i = 0; i < sharedWith.length; i++) {
              sharedWithUserIds[sharedWith[i].userId] = true;
            }
            const notYetShared = friends.filter(friend => !sharedWithUserIds[friend.userId]);
            setNotYetShared(notYetShared);
            setNotDoneLoading(true);
          })
          .catch(err => {
            console.error(err);
            setErrorMessage('bad-request');
          });
      })
      .catch(err => {
        console.error(err);
        setErrorMessage('bad-request');
      });
  }

  function handleChange(event) {
    const userId = parseInt(event.target.value);
    for (let i = 0; i < notYetShared.length; i++) {
      if (notYetShared[i].userId === userId) {
        notYetShared[i].selected = event.target.checked;
      }
    }
    setNotYetShared(notYetShared);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setDoneLoading(false);
    for (let i = 0; i < notYetShared.length; i++) {
      const friend = notYetShared[i];
      if (!friend.selected) continue;
      const req = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: friend.userId })
      };
      fetch(`/api/sharedRoutes/${this.props.routeId}`, req)
        .catch(err => {
          console.error(err);
          setErrorMessage('bad-request');
        });
    }
    window.location.hash = `route-details?routeId=${this.props.routeId}`;
  }

  renderFriends() {
    if (notYetShared.length === 0) {
      return <p className="no-friends">No friends available to share this route with</p>;
    }
    return (
      notYetShared.map(friend => {
        return (
          <li key={friend.userId} className="friend-list-item">
            <input type="checkbox" className="checkbox" id={friend.userId} name="friend"
              value={friend.userId} onChange={this.handleChange}/>
            <label className="friend-label" htmlFor={friend.userId}>
              <i className="friend-icon fas fa-user-circle" />
              <p className="friend-name">{friend.name}</p>
            </label>
          </li>
        );
      })
    );
  }

  render() {
    if (!this.context.user) return <Redirect to="log-in" />;

    return (
      <div className="page">
        <form className="share-form" onSubmit={this.handleSubmit}>
          <h1 className="page-title">Select Friend</h1>
          { doneLoading
            ? <>
                <ul className="friend-list">
                  {this.renderFriends()}
                </ul>
                <AddDateButton setModal={this.setDateModal} />
                <div className="center input-div">
                  <button className="button" type="submit">Share</button>
                </div>
              </>
            : <Spinner />
          }
        </form>
        { this.state.dateOpen
          ? <AddDateForm routeId={this.props.routeId} setModal={setDateModal}
            lastWalked={lastWalked} setLastWalked={setLastWalked}
            nextWalk={nextWalk} setNextWalk={setNextWalk} />
          : ''
        }
        { this.state.errorMessage
          ? <ErrorModal set={setErrorModal} message={errorMessage} />
          : ''
        }
      </div>
    );
  }
}

ShareRoute.contextType = AppContext;
