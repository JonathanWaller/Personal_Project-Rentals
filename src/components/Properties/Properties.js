import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";

import "./Properties.css";

//dispatchers
import { getProperties } from "../../ducks/propertyReducer";
import { getUser } from "../../ducks/userReducer";
import { getReviews } from "../../ducks/reviewReducer";

class Properties extends Component {
  constructor() {
    super();
    this.state = {
      filterString: ""
    };
  }
  componentDidMount() {
    this.props.getProperties();
    this.props.getReviews();
  }

  goToProperty = id => {
    // console.log(this.props);
    this.props.history.push(`/property/${id}`);
    // this.props.history.replace(`/property/${id}`);
  };

  cityHandler = e => {
    this.setState({ filterString: e.target.value });
  };

  // deleteHandler = id => {
  //   axios.delete(`/api/property/${id}`);
  // };

  render() {
    console.log(this.props);
    console.log("props.properties.properties", this.props.properties);
    // let myProperties = this.props.properties.map((property, ind) => {
    //   return (
    //     <div
    //       onClick={() => this.goToProperty(property.id)}
    //       key={property.id}
    //       className="propertieslist"
    //     >
    //       {/* <div id="propertiesimg">Image Goes Here</div> */}
    //       <img src={property.image_url} id="propertiesimg" alt="" />
    //       <div>{property.property_title}</div>
    //       {/* <div>{property.property_location}</div> */}
    //       <div>{property.address}</div>
    //       <div>Baths: {property.baths}</div>
    //       <div>Beds: {property.beds}</div>
    //       <div>Rate: ${property.price}</div>
    //     </div>
    //   );
    // });

    //set up to use a search function to look for the city title. if nothing in search bar, will display all properties
    let searchDisplay = this.props.properties
      .filter((property, ind) => {
        return property.address.includes(
          // this.state.filterString.charAt(0).toUpperCase()
          this.state.filterString
        );
      })
      .map((property, ind) => {
        return (
          <div
            onClick={() => this.goToProperty(property.id)}
            key={property.id}
            className="propertieslist"
          >
            {/* <div id="propertiesimg">Image Goes Here</div> */}
            <img src={property.image_url} id="propertiesimg" alt="" />
            <div>{property.property_title}</div>
            <div>{property.city}</div>
            {/* <div>{property.address}</div> */}
            <div>Baths: {property.baths}</div>
            <div>Beds: {property.beds}</div>
            <div>Rate: ${property.price}</div>
            {/* <button onClick={() => this.deleteHandler(property.id)}>
              Delete Listing
            </button> */}
          </div>
        );
      });

    return (
      <div>
        <input onChange={e => this.cityHandler(e)} placeholder="search city" />
        <br />
        <br />
        <Link to="/addproperty">
          <button>Add Listing</button>
        </Link>
        {/* <div>{myProperties}</div> */}
        <div>{searchDisplay}</div>
      </div>
    );
  }
}

// const mapStateToProps = state => state;
const mapStateToProps = ({ properties, user, reviews }) => ({
  ...properties,
  ...user,
  ...reviews
});

export default withRouter(
  connect(
    mapStateToProps,
    { getProperties, getUser, getReviews }
  )(Properties)
);
