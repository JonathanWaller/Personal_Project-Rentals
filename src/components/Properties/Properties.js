import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
// import axios from "axios";
import StarRatings from "react-star-ratings";
import axios from "axios";

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

  handleFavorite = (
    image_url,
    owner_post_id,
    property_title,
    beds,
    baths,
    description,
    price,
    address,
    city,
    round,
    owner_name,
    owner_avatar,
    user_id
  ) => {
    // console.log(property);
    axios.post("/api/favorite", {
      image_url,
      owner_post_id,
      property_title,
      beds,
      baths,
      description,
      price,
      address,
      city,
      round,
      owner_name,
      owner_avatar,
      user_id
    });
  };

  render() {
    console.log(this.props);
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
          <div key={property.id}>
            {/* <button onClick={() => this.handleFavorite(property)}> */}
            <button
              onClick={() =>
                this.handleFavorite(
                  property.image_url,
                  property.post_id,
                  property.property_title,
                  property.beds,
                  property.baths,
                  property.description,
                  property.price,
                  property.address,
                  property.city,
                  property.round,
                  property.user_name,
                  property.user_avatar,
                  this.props.user.userid
                )
              }
            >
              Add to Favorites
            </button>
            <div
              onClick={() => this.goToProperty(property.id)}
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
              {+property.baths > 1 ? (
                <div>Baths: {property.baths}</div>
              ) : (
                <div>Bath: {property.baths}</div>
              )}
              {property.beds > 1 ? (
                <div>Beds: {property.beds}</div>
              ) : (
                <div>Bed: {property.beds}</div>
              )}
              <div>Rate: ${property.price}</div>
              {/* <button>Add to Favorites</button> */}
              {/* <button onClick={() => this.deleteHandler(property.id)}>
              Delete Listing
            </button> */}
            </div>
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
