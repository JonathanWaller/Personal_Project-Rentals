import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
// import axios from "axios";
import StarRatings from "react-star-ratings";

import "./Properties.css";

//dispatchers
import { getProperties } from "../../ducks/propertyReducer";
import { getUser } from "../../ducks/userReducer";
import { getReviews } from "../../ducks/reviewReducer";
import { getAvgRating } from "../../ducks/ratingReducer";

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
    this.props.getAvgRating();
  }

  goToProperty = id => {
    // console.log(this.props);
    this.props.history.push(`/property/${id}`);
    // this.props.history.replace(`/property/${id}`);
  };

  cityHandler = e => {
    this.setState({ filterString: e.target.value });
  };

  render() {
    // console.log(this.props);
    // console.log(this.props.properties[0] ? this.props.properties[0].round : null);
    //^^^^^^^^^SHORT CIRCUIT EVALUATION ^^^^^^^^^
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
            <img src={property.image_url} id="propertiesimg" alt="" />
            <div>{property.property_title}</div>
            <StarRatings
              rating={+property.round}
              starRatedColor="gold"
              numberOfStars={5}
              starDimension="16px"
            />
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
        {this.props.isAuthed ? (
          <Link to="/addproperty">
            <button>Add Listing</button>
          </Link>
        ) : (
          // ) : null}
          <div>
            <a href={process.env.REACT_APP_LOGIN}>
              <button>Login to add listing</button>
            </a>
          </div>
        )}
        <div>{searchDisplay}</div>
      </div>
    );
  }
}

// const mapStateToProps = state => state;
const mapStateToProps = ({ properties, user, reviews, rating }) => ({
  ...properties,
  ...user,
  ...reviews,
  ...rating
});

export default withRouter(
  connect(
    mapStateToProps,
    { getProperties, getUser, getReviews, getAvgRating }
  )(Properties)
);
