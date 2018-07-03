import React, { Component } from "react";
import "./AddListing.css";

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
      amen1: "",
      amen2: "",
      amen3: "",
      rate: 0,
      image: ""
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
  descriptionHandler = e => {
    this.setState({
      description: e.target.value
    });
  };

  rateHandler = e => {
    this.setState({
      description: e.target.value
    });
  };

  amen_1Handler = e => {
    this.setState({
      amen1: e.target.value
    });
  };

  amen_2Handler = e => {
    this.setState({
      amen2: e.target.value
    });
  };

  amen_3Handler = e => {
    this.setState({
      amen3: e.target.value
    });
  };

  imageHandler = e => {
    this.setState({
      image: e.target.value
    });
  };

  render() {
    return (
      <div className="addlistingmain">
        <h1>Upload Property Image</h1>
        <img src={this.state.image} className="uploadimg" />
        <input
          onChange={e => {
            this.imageHandler(e);
          }}
        />
        <button>Add Image</button>
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
        <input
          onChange={e => this.descriptionHandler(e)}
          placeholder="Enter description"
        />
        <div className="amenitiesmain">
          <div>Amenities:</div>
          <input
            onChange={e => this.amen_1Handler(e)}
            placeholder="Enter amenities1"
          />
          <input
            onChange={e => this.amen_2Handler(e)}
            placeholder="Enter amenities2"
          />
          <input
            onChange={e => this.amen_3Handler(e)}
            placeholder="Enter amenities3"
          />
        </div>

        <div>Nightly Rate:</div>
        <input onChange={e => this.rateHandler(e)} placeholder="Enter price" />
        {/* <input id="auto_complete" type="text" placeholder="enter address" /> */}
        <button>Submit Details</button>
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
