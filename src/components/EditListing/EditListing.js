import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import firebase from "../Firebase";
import FileUploader from "react-firebase-file-uploader";

import { getUser } from "../../ducks/userReducer";

class EditListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      // location: this.props.myLocation,
      // city: this.props.city,
      beds: this.props.beds,
      baths: this.props.baths,
      description: this.props.desc,
      amen1: this.props.amen1,
      amen2: this.props.amen2,
      amen3: this.props.amen3,
      rate: this.props.price,
      image: "",
      firebaseImg: this.props.myImage,
      uploadImg: "",
      isUploading: false,
      progress: 0,
      uploadImgURL: "",
      titleflag: true
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
      })
      .then(() => {
        this.setState({
          firebaseImg: this.state.firebaseImg.replace(
            "/o/images%2F",
            "/o/resized-"
          )
        });
        // this.state.firebaseImg.replace("/o/images%2F", "'/o/resized-");
      });
  };

  titleHandler = e => {
    this.setState({
      title: e.target.value
    });
  };
  // locationHandler = e => {
  //   this.setState({
  //     location: e.target.value
  //   });
  // };
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

  submitHandler = () => (
    property_title,
    // property_location,
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
    axios.post("api/property", {
      property_title,
      // property_location,
      beds,
      baths,
      description,
      amen_1,
      amen_2,
      amen_3,
      price,
      firebaseImg,
      user_id
    });
  };

  editHandler = id => {
    axios
      .put(`/api/property/${id}`, {
        property_title: this.state.title,
        // property_location: this.state.location,
        beds: this.state.beds,
        baths: this.state.baths,
        description: this.state.description,
        amen_1: this.state.amen1,
        amen_2: this.state.amen2,
        amen_3: this.state.amen3,
        price: this.state.rate,
        // firebaseImg: this.state.firebaseImg
        image_url: this.state.firebaseImg
      })
      .then(() => this.props.history.replace("/properties"));
    // .then(() => this.props.history.replace(`/property/${this.props.id}`));
  };

  render(props) {
    console.log("this is props", this.props);
    return (
      <div className="addlistingmain">
        <h1>
          Edit Your Listing at
          {this.props.address}
        </h1>
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
        <img src={this.state.firebaseImg} className="uploadimg" alt="" />
        <div>Title:</div>
        {/* <button>Edit</button> */}
        <input
          value={this.state.title}
          onChange={e => this.titleHandler(e)}
          placeholder="Enter Title"
        />
        {/* <div>Location:</div>
        <input
          value={this.state.location}
          onChange={e => {
            this.locationHandler(e);
          }}
          placeholder="enter address here"
        /> */}
        <div>Beds: {this.state.beds}</div>
        <input
          value={this.state.beds}
          onChange={e => this.bedsHandler(e)}
          placeholder="# of beds"
        />
        <div>Bathrooms:</div>
        <input
          value={this.state.baths}
          onChange={e => this.bathsHandler(e)}
          placeholder="# of bathrooms"
        />
        <div>Description:</div>
        <input
          value={this.state.description}
          onChange={e => this.descriptionHandler(e)}
          placeholder="Enter description"
        />
        <div className="amenitiesmain">
          <div>Amenities:</div>
          <input
            value={this.state.amen1}
            onChange={e => this.amen_1Handler(e)}
            placeholder="Enter amenities1"
          />
          <input
            value={this.state.amen2}
            onChange={e => this.amen_2Handler(e)}
            placeholder="Enter amenities2"
          />
          <input
            value={this.state.amen3}
            onChange={e => this.amen_3Handler(e)}
            placeholder="Enter amenities3"
          />
        </div>

        <div>Nightly Rate:</div>
        <input
          value={this.state.rate}
          onChange={e => this.rateHandler(e)}
          placeholder="Enter price"
        />
        {/* <button
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
              this.state.firebaseImg,
              this.props.user.id
            )
          }
        >
          Submit Details
        </button> */}
        <button onClick={() => this.editHandler(this.props.id)}>
          Submit Edit
        </button>
        {/* <button onClick={() => this.props.toggleView()}>Cancel</button> */}
        <Link to="/properties">
          <button>Cancel</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ user, properties }) => ({ ...user, ...properties });

export default withRouter(
  connect(
    mapStateToProps,
    { getUser }
  )(EditListing)
);
