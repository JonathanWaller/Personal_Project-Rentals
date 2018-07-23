import React, { Component } from "react";
import LocationSearchInput from "../Map/LocationSearchInput/LocationSearchInput";
import "./AddListing.css";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import firebase from "../Firebase";
import FileUploader from "react-firebase-file-uploader";

import { getUser } from "../../ducks/userReducer";

class AddListing extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      // location: "",
      city: "",
      beds: 0,
      baths: 0,
      description: "",
      amen1: "",
      amen2: "",
      amen3: "",
      rate: 0,
      // image: "",
      firebaseImg: "https://www.owensoundhonda.on.ca/dist/img/nophoto.jpg",
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
      // .then(url => {
      //   console.log(url);
      //   this.setState({ firebaseImg: url });
      .then(url => {
        this.setState({
          firebaseImg: url.replace("/o/images%2F", "/o/resized-")
        });
      });
  };

  titleHandler = e => {
    this.setState({
      title: e.target.value
    });
  };
  cityHandler = e => {
    this.setState({
      city: e.target.value
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

  submitHandler = (
    property_title,
    address,
    lat,
    lng,
    city,
    beds,
    baths,
    description,
    amen_1,
    amen_2,
    amen_3,
    price,
    firebaseImg,
    user_id
  ) => {
    axios
      .post("api/property", {
        property_title,
        address,
        lat,
        lng,
        city,
        beds,
        baths,
        description,
        amen_1,
        amen_2,
        amen_3,
        price,
        firebaseImg,
        user_id
      })
      // .then(() => {
      //   axios.post("/api/review", {null});
      // })
      .then(() => this.props.history.replace("/properties"));
  };

  render() {
    console.log(this.state);
    // console.log(this.props);
    // console.log(this.props.user.id);
    return (
      <div className="addlistingmain">
        <h1>Add Listing to Site</h1>
        <div className="upload">
          <form className="upload-form">
            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
            <label>
              Click Here To Upload Your Image
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
        {/* <img src={this.state.firebaseImg} className="uploadimg" alt="" /> */}
        {/* <input
          onChange={e => {
            this.imageHandler(e);
          }}
        /> */}
        {/* <button>Add Image</button> */}
        <div className="add_list">
          <div>Title</div>
          <input
            onChange={e => this.titleHandler(e)}
            placeholder="Enter Title"
            id="place"
          />
          <div>City</div>
          <input onChange={e => this.cityHandler(e)} placeholder="Enter city" />
          <div>Address</div>
          <LocationSearchInput />
          {/* <input placeholder="google location" id="search_term" /> */}
          {/* <input
          onChange={e => {
            this.locationHandler(e);
          }}
          placeholder="enter address here"
        /> */}
          <div>Beds</div>
          <input onChange={e => this.bedsHandler(e)} placeholder="# of beds" />
          <div>Bathrooms</div>
          <input
            onChange={e => this.bathsHandler(e)}
            placeholder="# of bathrooms"
          />
          <div>Description</div>
          <input
            onChange={e => this.descriptionHandler(e)}
            placeholder="Enter description"
          />
          <div className="amenitiesmain">
            <div>Amenities</div>
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

          <div>Nightly Rate</div>
          <input
            onChange={e => this.rateHandler(e)}
            placeholder="Enter price"
          />
          {/* <input id="auto_complete" type="text" placeholder="enter address" /> */}
        </div>
        <div className="submit_cancel">
          <Link to="properties">
            <button id="submit_cancel_fonts" className="add_cancel">
              Cancel
            </button>
          </Link>
          <button
            id="submit_cancel_fonts"
            className="add_submit"
            onClick={() =>
              this.submitHandler(
                this.state.title,
                this.props.address,
                this.props.lat,
                this.props.lng,
                this.state.city,
                this.state.beds,
                this.state.baths,
                this.state.description,
                this.state.amen1,
                this.state.amen2,
                this.state.amen3,
                this.state.rate,
                this.state.firebaseImg,
                this.props.user.userid
              )
            }
          >
            Submit Details
          </button>
          {/* <button onClick={() => this.editHandler(this.props.user.id)}>
          Submit Edit
        </button> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, location }) => ({ ...user, ...location });

export default connect(
  mapStateToProps,
  { getUser }
)(AddListing);
