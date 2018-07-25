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
  updateLng,
  handleChange
} from "../../../ducks/locationReducer";

class LocationSearchInput extends React.Component {
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))

      // below line is now necessary, just for reference purposes
      // .then(latLng => console.log("Success", latLng))
      //
      .then(latLng => {
        this.props.updateLat(latLng.lat);
        this.props.updateLng(latLng.lng);
      })
      .then(() => this.props.updateAddress(address))
      .catch(error => console.error("Error", error));
  };

  render() {
    // const { addresses, lat, lng } = this.props;
    return (
      <PlacesAutocomplete
        value={this.props.address}
        onChange={this.props.handleChange}
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

const mapStateToProps = state => state.location;

export default connect(
  mapStateToProps,
  {
    updateAddress,
    updateLat,
    updateLng,
    handleChange
  }
)(LocationSearchInput);
