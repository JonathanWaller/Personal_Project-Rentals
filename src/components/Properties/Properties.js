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
import { addFavorite, getFavorites } from "../../ducks/favoritesReducer";

class Properties extends Component {
  constructor() {
    super();
    this.state = {
      filterString: "",
      noLike: "fa fa-1x fa-heart-o not-liked",
      liked: "fa fa-1x fa-heart liked"
    };
  }
  componentDidMount() {
    this.props.getProperties();
    this.props.getReviews();
    this.props.getAvgRating();
    this.props.getFavorites(this.props.user.userid);
  }

  goToProperty = id => {
    // console.log(this.props);
    this.props.history.push(`/property/${id}`);
    // this.props.history.replace(`/property/${id}`);
  };

  cityHandler = e => {
    this.setState({ filterString: e.target.value });
  };

  toggleLeave = () => {
    this.setState({
      noLike: "fa fa-2x fa-heart-o not-liked"
    });
  };
  toggleLiked = () => {
    this.setState({
      noLike: "fa fa-1x fa-heart liked"
    });
  };

  render() {
    console.log(this.props);
    // let likeCheck = this.props.favorites.filter(property, ind)=>{
    //   return property.owner_post_id.includes()
    // }
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
        // console.log("logging each property", property);
        let likeCheck = this.props.favorites.find(
          fav => fav.owner_post_id === property.post_id
        );
        // console.log("likeCheck", likeCheck);
        return (
          <div key={property.id}>
            {/* <button onClick={() => this.handleFavorite(property)}> */}
            {/* <button
              onClick={() =>
                this.props.addFavorite(
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
            </button> */}
            <div className="propertieslist">
              <div className="propertyLike">
                <img
                  src={property.image_url}
                  id="propertiesimg"
                  onClick={() => this.goToProperty(property.id)}
                  alt=""
                />
                {this.props.isAuthed ? (
                  <div>
                    {likeCheck ? (
                      <i id="like-btn" className={this.state.liked} />
                    ) : (
                      <div>
                        <i
                          id="like-btn"
                          className={this.state.noLike}
                          onClick={() =>
                            this.props
                              .addFavorite(
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
                              .then(() => this.toggleLiked())
                          }
                        />
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
              <div onClick={() => this.goToProperty(property.id)}>
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
              </div>
            </div>
          </div>
        );
      });

    return (
      <div>
        <input
          onChange={e => this.cityHandler(e)}
          placeholder="search by city (Dallas) or state (CA)"
        />
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
const mapStateToProps = ({ properties, user, reviews, rating, favorites }) => ({
  ...properties,
  ...user,
  ...reviews,
  ...rating,
  ...favorites
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      getProperties,
      getUser,
      getReviews,
      getAvgRating,
      addFavorite,
      getFavorites
    }
  )(Properties)
);
