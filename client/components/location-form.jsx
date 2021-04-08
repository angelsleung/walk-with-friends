import React from 'react';
import { Loader } from '@googlemaps/js-api-loader';
export default class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      A: '',
      B: '',
      C: ''
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
  }

  componentDidMount() {
    const loader = new Loader({
      apiKey: 'AIzaSyCG4ySJPtAS0a5rJRHZV8uPM6fgOzCZD0A',
      libraries: ['places']
    });
    loader.load().then(() => {
      this.autocompleteInstanceA = new google.maps.places.Autocomplete(
        this.autocompleteRefA.current,
        {
          types: ['establishment'],
          componentRestrictions: { country: 'US' },
          fields: ['place_id', 'geometry', 'name']
        }
      );
      this.autocompleteInstanceB = new google.maps.places.Autocomplete(
        this.autocompleteRefB.current,
        {
          types: ['establishment'],
          componentRestrictions: { country: 'US' },
          fields: ['place_id', 'geometry', 'name']
        }
      );
      this.autocompleteInstanceC = new google.maps.places.Autocomplete(
        this.autocompleteRefC.current,
        {
          types: ['establishment'],
          componentRestrictions: { country: 'US' },
          fields: ['place_id', 'geometry', 'name']
        }
      );
      this.autocompleteInstanceA.addListener('place_changed', () => {
        const place = this.autocompleteInstanceA.getPlace();
        if (!place.geometry) {
          this.autocompleteRefA.current.placeholder = 'Enter a place';
        } else {
          this.setState({ A: place.name });
        }
      });
      this.autocompleteInstanceB.addListener('place_changed', () => {
        const place = this.autocompleteInstanceB.getPlace();
        if (!place.geometry) {
          this.autocompleteRefB.current.placeholder = 'Enter a place';
        } else {
          this.setState({ B: place.name });
        }
      });
      this.autocompleteInstanceC.addListener('place_changed', () => {
        const place = this.autocompleteInstanceC.getPlace();
        if (!place.geometry) {
          this.autocompleteRefC.current.placeholder = 'Enter a place';
        } else {
          this.setState({ C: place.name });
        }
      });
    });
  }

  handleChangeA(event) {
    this.setState({ A: event.target.value });
  }

  handleChangeB(event) {
    this.setState({ B: event.target.value });
  }

  handleChangeC(event) {
    this.setState({ C: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form className="location-form" onSubmit={this.handleSubmit}>
        <h1 className="page-title">Map a Route</h1>
        <div className="input-div">
          <label htmlFor="startA" className="location-label">Start (A)</label>
          <input type="text" value={this.state.A} onChange={this.handleChangeA}
            className="location-input" ref={this.autocompleteRefA} id="startA" />
        </div>
        <div className="input-div">
          <label htmlFor="stopB" className="location-label">Stop (B)</label>
          <input type="text" value={this.state.B} onChange={this.handleChangeB}
            className="location-input" ref={this.autocompleteRefB} id="stopB" />
        </div>
        <div className="input-div">
          <label htmlFor="stopC" className="location-label">Stop (C)</label>
          <input type="text" value={this.state.C} onChange={this.handleChangeC}
            className="location-input" ref={this.autocompleteRefC} id="stopC" />
        </div>
        <div className="input-div">
          <label className="location-label">End (A)</label>
          <p className="location-input read-only">{this.state.A}</p>
        </div>
        <div className="center input-div">
          <button className="go-button">Go</button>
        </div>
      </form>
    );
  }
}
