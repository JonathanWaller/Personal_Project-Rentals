import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import firebase from "../Firebase";
import FileUploader from "react-firebase-file-uploader";

import { getUser } from "../../ducks/userReducer";
import { getProperties } from "../../ducks/propertyReducer";

class EditListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.property.property_title,
      beds: this.props.property.beds,
      baths: this.props.property.baths,
      description: this.props.property.description,
      amen1: this.props.property.amen_1,
      amen2: this.props.property.amen_2,
      amen3: this.props.property.amen_3,
      rate: this.props.property.price,
      firebaseImg: this.props.property.image_url,
      uploadImg: "",
      isUploading: false,
      progress: 0,
      uploadImgURL: "",
      titleflag: true
      // image: "",
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
      });
  };

  titleHandler = e => {
    this.setState({
      title: e.target.value
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

  // imageHandler = e => {
  //   this.setState({
  //     image: e.target.value
  //   });
  // };

  editHandler = async id => {
    await Promise.all([
      axios.put(`/api/property/${id}`, {
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
      }),
      this.props.getProperties(),
      this.props.history.replace(`/property/${this.props.property.id}`)
    ]);
  };

  render(props) {
    console.log("this is props", this.props);
    let { property } = this.props;
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
        <input
          value={this.state.title}
          onChange={e => this.titleHandler(e)}
          placeholder="Enter Title"
        />
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
        <button onClick={() => this.editHandler(this.props.property.post_id)}>
          Submit Edit
        </button>
        {/* <Link to="/properties"> */}
        <Link to={`/property/${property.id}`}>
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
    { getUser, getProperties }
  )(EditListing)
);
