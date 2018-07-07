import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import { connect } from "react-redux";

//dispatcher
import {
  updateAddress,
  updateLat,
  updateLng
} from "../../../ducks/locationReducer";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      lat: 0,
      lng: 0
    };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))

      //   .then(latLng => )

      // below line is now necessary, just for reference purposes
      // .then(latLng => console.log("Success", latLng))
      //
      .then(latLng =>
        this.setState({
          lat: latLng.lat,
          lng: latLng.lng
        })
      )
      // .then(() => console.log("Address", address))
      .then(() => this.setState({ address: address }))
      .catch(error => console.error("Error", error));
  };

  render() {
    const { addresses, lat, lng } = this.props;
    console.log("i am props man", this.props);
    console.log(this.state);
    console.log(
      "addy",
      this.state.address,
      "lat",
      this.state.lat,
      "lng",
      this.state.lng
    );
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input"
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

const mapStateToProps = ({ addresses, lat, lng }) => ({
  ...addresses,
  ...lat,
  ...lng
});

export default connect(
  mapStateToProps,
  {
    updateAddress,
    updateLat,
    updateLng
  }
)(LocationSearchInput);
