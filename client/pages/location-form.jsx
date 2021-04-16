import React from 'react';

export default class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      A: { name: '' },
      B: { name: '' },
      C: { name: '' }
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
    this.autocompleteInstanceA = new google.maps.places.Autocomplete(
      this.autocompleteRefA.current,
      {
        types: ['establishment'],
        componentRestrictions: { country: 'US' },
        fields: ['place_id', 'name']
      }
    );
    this.autocompleteInstanceB = new google.maps.places.Autocomplete(
      this.autocompleteRefB.current,
      {
        types: ['establishment'],
        componentRestrictions: { country: 'US' },
        fields: ['place_id', 'name']
      }
    );
    this.autocompleteInstanceC = new google.maps.places.Autocomplete(
      this.autocompleteRefC.current,
      {
        types: ['establishment'],
        componentRestrictions: { country: 'US' },
        fields: ['place_id', 'name']
      }
    );

    this.autocompleteInstanceA.addListener('place_changed', () => {
      const place = this.autocompleteInstanceA.getPlace();
      if (place) {
        this.setState({ A: place });
      }
    });
    this.autocompleteInstanceB.addListener('place_changed', () => {
      const place = this.autocompleteInstanceB.getPlace();
      if (place) {
        this.setState({ B: place });
      }
    });
    this.autocompleteInstanceC.addListener('place_changed', () => {
      const place = this.autocompleteInstanceC.getPlace();
      if (place) {
        this.setState({ C: place });
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
    window.location.hash = `route-details?nameA=${this.state.A.name}&nameB=${this.state.B.name}&nameC=${this.state.C.name}&placeA=${this.state.A.place_id}&placeB=${this.state.B.place_id}&placeC=${this.state.C.place_id}`;
  }

  render() {
    return (
      <div className="page flex-center">
        <form className="location-form" onSubmit={this.handleSubmit}>
          <h1 className="page-title">Map a Route</h1>
          <div className="input-div">
            <label htmlFor="A" className="location-label">Start (A)</label>
            <input type="text" value={this.state.A.name} onChange={this.handleChangeA}
              className="location-input" ref={this.autocompleteRefA} id="A" />
          </div>
          <div className="input-div">
            <label htmlFor="B" className="location-label">Stop (B)</label>
            <input type="text" value={this.state.B.name} onChange={this.handleChangeB}
              className="location-input" ref={this.autocompleteRefB} id="B" />
          </div>
          <div className="input-div">
            <label htmlFor="C" className="location-label">Stop (C)</label>
            <input type="text" value={this.state.C.name} onChange={this.handleChangeC}
              className="location-input" ref={this.autocompleteRefC} id="C" />
          </div>
          <div className="input-div">
            <label htmlFor="D" className="location-label">End (D)</label>
            <input type="text" value={this.state.A.name} id="D"
              className="location-input read-only" readOnly={true}></input>
          </div>
          <div className="center input-div">
            <button className="button">Go</button>
          </div>
        </form>
      </div>
    );
  }
}
