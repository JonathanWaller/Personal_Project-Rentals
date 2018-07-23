import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import StarRatings from "react-star-ratings";
import axios from "axios";
import FontAwesome from "react-fontawesome";

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
    this.props.history.push(`/property/${id}`);
  };

  cityHandler = e => {
    this.setState({ filterString: e.target.value });
  };

  // re-renders page, to set the heart-fill to only be the property that was clicked
  toggleLiked = async ind => {
    await Promise.all([
      this.props.getProperties(),
      this.props.getReviews(),
      this.props.getAvgRating(),
      this.props.getFavorites(this.props.user.userid)
    ]);
  };

  render() {
    console.log(this.props);
    //set up to use a search function to look for the city title. if nothing in search bar, will display all properties
    let searchDisplay = this.props.properties
      .filter((property, ind) => {
        return property.address.includes(
          // this.state.filterString.charAt(0).toUpperCase()
          this.state.filterString
        );
      })
      .map((property, ind) => {
        // checking for properties that are in favorites table
        let likeCheck = this.props.favorites.find(
          fav => fav.owner_post_id === property.post_id
        );
        return (
          <div key={property.id} className="properties_solo_property">
            <div className="propertyLike">
              <div
                style={{ backgroundImage: `url(${property.image_url})` }}
                className="propertiesimg"
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
            <div
              // single_card_text is initiated in SingleProperty
              // className="single_card_text"
              className="properties_solo_under_img"
              id="properties_card_text"
              onClick={() => this.goToProperty(property.id)}
            >
              <div id="properties_city">{property.city}</div>
              <div id="properties_title">{property.property_title}</div>
              <div className="properties_beds_baths">
                {+property.baths > 1 ? (
                  <div>{property.baths} baths</div>
                ) : (
                  <div>{property.baths} bath</div>
                )}
                {property.beds > 1 ? (
                  <div>{property.beds} beds</div>
                ) : (
                  <div>{property.beds} bed</div>
                )}
              </div>
              <div className="properties_rate_font">
                ${property.price} per night
              </div>
              <div className="ratings_main">
                <StarRatings
                  rating={+property.round}
                  starRatedColor="#1e85ae"
                  numberOfStars={5}
                  starDimension="13px"
                />
                <div className="properties_review_count">{property.count}</div>
              </div>
            </div>
          </div>
        );
      });

    return (
      <div className="properties_main">
        <div className="top_of_search">
          <div className="search" id="properties_search">
            <span className="fa fa-search" id="my_search" />
            <input
              className="search-term"
              onChange={e => this.cityHandler(e)}
              placeholder="Try &quot;Dallas&quot; or &quot;CA&quot;"
            />
          </div>
        </div>
        {this.props.isAuthed ? (
          <div className="properties_add_btn">
            <Link to="/addproperty">
              <button>Add Listing</button>
            </Link>
          </div>
        ) : (
          <div className="properties_add_login_btn">
            <a href={process.env.REACT_APP_LOGIN}>
              <button className="properties_login_btn">
                Login to add listing
              </button>
            </a>
          </div>
        )}
        <div className="all_properties">{searchDisplay}</div>
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
