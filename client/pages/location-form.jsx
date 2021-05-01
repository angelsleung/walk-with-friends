import React from 'react';
import Redirect from '../components/redirect';
import ErrorModal from '../components/error-modal';
import AppContext from '../lib/app-context';

export default class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      A: { name: '' },
      B: { name: '' },
      C: { name: '' },
      errorA: false,
      errorB: false,
      errorC: false,
      errorMessage: ''
    };
    this.autocompleteRefA = React.createRef();
    this.autocompleteRefB = React.createRef();
    this.autocompleteRefC = React.createRef();
    this.autocompleteInstanceA = null;
    this.autocompleteInstanceB = null;
    this.autocompleteInstanceC = null;
    this.handleChangeA = this.handleChangeA.bind(this);
    this.handleChangeB = this.handleChangeB.bind(this);
    this.handleChangeC = this.handleChangeC.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setErrorModal = this.setErrorModal.bind(this);
  }

  componentDidMount() {
    if (!navigator.onLine) {
      this.setState({ errorMessage: 'network-error' });
      return;
    }

    this.autocompleteInstanceA = new google.maps.places.Autocomplete(
      this.autocompleteRefA.current,
      {
        componentRestrictions: { country: 'US' },
        fields: ['place_id', 'name']
      }
    );
    this.autocompleteInstanceB = new google.maps.places.Autocomplete(
      this.autocompleteRefB.current,
      {
        componentRestrictions: { country: 'US' },
        fields: ['place_id', 'name']
      }
    );
    this.autocompleteInstanceC = new google.maps.places.Autocomplete(
      this.autocompleteRefC.current,
      {
        componentRestrictions: { country: 'US' },
        fields: ['place_id', 'name']
      }
    );
    this.autocompleteInstanceA.addListener('place_changed', () => {
      const place = this.autocompleteInstanceA.getPlace();
      if (place) {
        this.setState({
          A: place,
          errorA: false
        });
      }
    });
    this.autocompleteInstanceB.addListener('place_changed', () => {
      const place = this.autocompleteInstanceB.getPlace();
      if (place) {
        this.setState({
          B: place,
          errorB: false
        });
      }
    });
    this.autocompleteInstanceC.addListener('place_changed', () => {
      const place = this.autocompleteInstanceC.getPlace();
      if (place) {
        this.setState({
          C: place,
          errorC: false
        });
      }
    });
  }

  handleChangeA(event) {
    this.setState({ A: { name: event.target.value } });
  }

  handleChangeB(event) {
    this.setState({ B: { name: event.target.value } });
  }

  handleChangeC(event) {
    this.setState({ C: { name: event.target.value } });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!navigator.onLine) {
      this.setState({ errorMessage: 'network-error' });
      return;
    }
    this.setState({
      errorA: !this.state.A.place_id,
      errorB: !this.state.B.place_id,
      errorC: !this.state.C.place_id
    });
    if (this.state.A.place_id && this.state.B.place_id && this.state.C.place_id) {
      window.location.hash = `route-details?nameA=${this.state.A.name}&nameB=${this.state.B.name}&nameC=${this.state.C.name}&placeA=${this.state.A.place_id}&placeB=${this.state.B.place_id}&placeC=${this.state.C.place_id}`;
    }
  }

  setErrorModal(errorMessage) {
    this.setState({ errorMessage });
  }

  render() {
    if (!this.context.user) return <Redirect to="log-in" />;
    const errorAClass = this.state.errorA ? '' : 'invisible';
    const errorBClass = this.state.errorB ? '' : 'invisible';
    const errorCClass = this.state.errorC ? '' : 'invisible';
    return (
      <div className="page">
        <form className="location-form" onSubmit={this.handleSubmit}>
          <h1 className="page-title">Map a Route</h1>
          <div className="input-div">
            <label htmlFor="A" className="location-label">Start (A)</label>
            <input type="text" value={this.state.A.name} onChange={this.handleChangeA}
              className="location-input" ref={this.autocompleteRefA} id="A" required autoFocus/>
            <p className={`location-message ${errorAClass}`}>Select a location from the list</p>
          </div>
          <div className="input-div">
            <label htmlFor="B" className="location-label">Stop (B)</label>
            <input type="text" value={this.state.B.name} onChange={this.handleChangeB}
              className="location-input" ref={this.autocompleteRefB} id="B" required/>
            <p className={`location-message ${errorBClass}`}>Select a location from the list</p>
          </div>
          <div className="input-div">
            <label htmlFor="C" className="location-label">Stop (C)</label>
            <input type="text" value={this.state.C.name} onChange={this.handleChangeC}
              className="location-input" ref={this.autocompleteRefC} id="C" required/>
            <p className={`location-message ${errorCClass}`}>Select a location from the list</p>
          </div>
          <div className="input-div">
            <label htmlFor="D" className="location-label">End (D)</label>
            <input type="text" value={this.state.A.name} id="D"
              className="location-input read-only" readOnly={true} />
          </div>
          <div className="center input-div">
            <button type="submit" className="button">Go</button>
          </div>
        </form>
        { this.state.errorMessage
          ? <ErrorModal message={this.state.errorMessage} set={this.setErrorModal} />
          : ''
        }
      </div>
    );
  }
}

LocationForm.contextType = AppContext;
