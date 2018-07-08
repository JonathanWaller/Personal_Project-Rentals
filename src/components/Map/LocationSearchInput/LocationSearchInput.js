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
  constructor(props) {
    super(props);
    // this.state = {
    //   address: "",
    //   lat: 0,
    //   lng: 0
    // };
  }

  //   handleChange = address => {
  //     this.setState({ address });
  //   };

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

      //   **everything below is for local state**
      //   .then(latLng =>
      //     this.setState({
      //       lat: latLng.lat,
      //       lng: latLng.lng
      //     })
      //   )
      //   .then(() => this.setState({ address: address }))
      .catch(error => console.error("Error", error));
  };

  render() {
    const { addresses, lat, lng } = this.props;
    // console.log("i am props", this.props);
    // console.log("props address", this.props.address);
    // console.log("props latty", this.props.lat);
    // console.log("props longy", this.props.lng);

    // console.log(this.state);
    // console.log(
    //   "state_address",
    //   this.state.address,
    //   "state_lat",
    //   this.state.lat,
    //   "state_lng",
    //   this.state.lng
    // );
    return (
      //   <PlacesAutocomplete
      //     value={this.state.address}
      //     onChange={this.handleChange}
      //     onSelect={this.handleSelect}
      //   >
      <PlacesAutocomplete
        value={this.props.address}
        onChange={this.props.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            {/* <button onClick={() => this.props.updateAddress("fireball")}>
              test button
            </button> */}
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

// const mapStateToProps = ({ address, lat, lng }) => ({
//   ...address,
//   ...lat,
//   ...lng
// });

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
