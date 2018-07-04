import React, { Component } from "react";
import "./AddListing.css";
import axios from "axios";

import firebase from "../Firebase";
import FileUploader from "react-firebase-file-uploader";

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
      image: "",
      firebaseImg: "",
      uploadImg: "",
      isUploading: false,
      progress: 0,
      uploadImgURL: ""
    };
  }

  // for firebase
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ uploadImg: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      // .then(url => this.setState({ uploadImgURL: url }));
      .then(url => {
        console.log(url);
        this.setState({ firebaseImg: url });
        // axios.post("/api/addUploadImg", { url });
      });

    // .then(() =>
    //   this.props.editAvatar(this.props.user.user.id, this.state.uploadImgURL)
    // );
  };

  // for google maps
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
      rate: e.target.value
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

  submitHandler = (
    property_title,
    property_location,
    beds,
    baths,
    description,
    amen1,
    amen2,
    amen3,
    price,
    firebaseImg
  ) => {
    axios.post("api/property", {
      property_title,
      property_location,
      beds,
      baths,
      description,
      amen1,
      amen2,
      amen3,
      price,
      firebaseImg
    });
  };

  render() {
    return (
      <div className="addlistingmain">
        <h1>You will add/upload your image here</h1>
        <div className="upload">
          <form className="upload-form">
            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
            <label>
              Upload Your Image
              <FileUploader
                hidden
                accept="image/*"
                name="uploadImg"
                randomizeFilename
                storageRef={firebase.storage().ref("images")}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              />
            </label>
          </form>
        </div>
        <img src={this.state.image} className="uploadimg" alt="" />
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
        <button
          onClick={() =>
            this.submitHandler(
              this.state.title,
              this.state.location,
              this.state.beds,
              this.state.baths,
              this.state.description,
              this.state.amen1,
              this.state.amen2,
              this.state.amen3,
              this.state.rate,
              this.state.firebaseImg
            )
          }
        >
          Submit Details
        </button>
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
