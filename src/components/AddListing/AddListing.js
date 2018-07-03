import React, { Component } from "react";

// import firebase from "../Firebase";
// import FileUploader from "react-firebase-file-uploader";

class AddListing extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      location: "",
      beds: 0,
      baths: 0,
      description: "",
      amenities: "",
      rate: 0
    };
  }
  // activatePlacesSearch = () => {
  //   var input = document.getElementById("auto_complete");
  //   var autocomplete = new google.maps.places.Autocomplete(input);
  // };

  titleHandler = e => {
    this.setState({
      title: e.target.value
    });
  };
  locationHandler = e => {
    this.setState({
      location: e.target.value
    });
  };
  bedsHandler = e => {
    this.setState({
      beds: e.target.value
    });
  };
  bathsHandler = e => {
    this.setState({
      baths: e.target.value
    });
  };
  // descriptionHandler = e => {
  //   this.setState({
  //     description: e.target.value
  //   });

  render() {
    return (
      <div>
        <h1>Add Listing to Site</h1>
        <div>Title: {this.state.title}</div>
        <input onChange={e => this.titleHandler(e)} placeholder="Enter Title" />
        <div>Location:{this.state.location}</div>
        <input
          onChange={e => {
            this.locationHandler(e);
          }}
          placeholder="enter address here"
        />
        <div>Beds: {this.state.beds}</div>
        <input onChange={e => this.bedsHandler(e)} placeholder="# of beds" />
        <div>Bathrooms: {this.state.baths}</div>
        <input
          onChange={e => this.bathsHandler(e)}
          placeholder="# of bathrooms"
        />
        <div>Description:</div>
        <input placeholder="Enter description" />
        <div>Amenities:</div>
        <input placeholder="Enter amenities" />
        <div>Nightly Rate:</div>
        <input placeholder="Enter price" />
        {/* <input id="auto_complete" type="text" placeholder="enter address" /> */}
        <button>Submit Listing</button>
      </div>
    );
  }
}

{
  /* <script>
  function activatePlacesSearch() {
  var input = document.getElementById("auto_complete");
  var autocomplete = new google.maps.places.Autocomplete(input);
}
</script>
<script
  type="text/javascript"
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB5uIm_ZPxZT0vO5p9JXXw1xQCUeyGCCws&libraries=places&callback=activatePlacesSearch"
></script> */
}

export default AddListing;
