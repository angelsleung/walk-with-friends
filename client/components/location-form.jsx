import React from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { start: '' };
    this.autocompleteRefA = React.createRef();
    this.autocompleteRefB = React.createRef();
    this.autocompleteRefC = React.createRef();
    this.autocompleteInstanceA = null;
    this.autocompleteInstanceB = null;
    this.autocompleteInstanceC = null;
    //   this.handleChange = this.handleChange.bind(this);
    //   this.handleSubmit = this.handleSubmit.bind(this);
    // })
  }

  componentDidMount() {
    const loader = new Loader({
      apiKey: 'AIzaSyCG4ySJPtAS0a5rJRHZV8uPM6fgOzCZD0A',
      libraries: ['places']
    });

    const google = null;
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
      // this.autocompleteRef.addListener('place_changed', () => {
      //   const place = this.autocompleteRef.getPlace();
      //   if (!place.geometry) {
      //     this.autocompleteRef.current.placeholder = 'Enter a place';
      //   } else {
      //     this.autocompleteRef.current.placeholder = place.name;
      //   }
      // });
    });
  }

  // handleChange(event) {
  // }

  // handleSubmit(event) {
  //   event.preventDefault();
  // }

  render() {
    return (
      <form className="location-form">
        <h1 className="page-title">Map a Route</h1>
        <div className="input-div">
          <label htmlFor="start" className="location-label">Start (A)</label>
          <input type="text" value={this.state.A} name="A"
            className="location-input" ref={this.autocompleteRefA} />
        </div>
        <div className="input-div">
          <label htmlFor="start" className="location-label">Stop (B)</label>
          <input type="text" value={this.state.B} className="location-input"
            ref={this.autocompleteRefB} />
        </div>
        <div className="input-div">
          <label htmlFor="start" className="location-label">Stop (C)</label>
          <input type="text" value={this.state.C} className="location-input"
            ref={this.autocompleteRefC} />
        </div>
        <div className="input-div">
          <label htmlFor="start" className="location-label">End (A)</label>
          <input type="text" value={this.state.A} readOnly={true} className="location-input" />
        </div>
        <div className="center input-div">
          <button className="go-button">Go</button>
        </div>
      </form>
    );
  }
}
