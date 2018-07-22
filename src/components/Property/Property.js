import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
// import EditListing from "../EditListing/EditListing";
import Map from "../Map/Map/Map";
import AllReviews from "../Review/AllReviews";
import Moment from "react-moment";
import StarRatings from "react-star-ratings";
import { addFavorite, getFavorites } from "../../ducks/favoritesReducer";
import FontAwesome from "react-fontawesome";
import "./Property.css";

class Property extends Component {
  constructor() {
    super();
    this.state = {
      editShow: false,
      reviewsShow: false,
      noLike: "fa fa-2x fa-heart-o not-liked",
      liked: "fa fa-2x fa-heart liked"
    };
  }

  componentDidMount() {
    this.props.user && this.props.getFavorites(this.props.user.userid);
  }

  deleteHandler = id => {
    axios
      .delete(`/api/property/${id}`)
      .then(() => this.props.history.replace("/properties"));
  };

  // toggleEditView = () => {
  //   this.setState({
  //     propertyShow: !this.state.propertyShow,
  //     editShow: !this.state.editShow
  //   });
  // };

  toggleReviews = () => {
    this.setState({
      reviewsShow: !this.state.reviewsShow
    });
  };

  goToProperty = id => {
    this.props.history.push(`/addReview/${id}`);
  };
  // toggleLeave = () => {
  //   this.setState({
  //     noLike: "fa fa-2x fa-heart-o not-liked"
  //   });
  // };
  toggleLiked = () => {
    this.setState({
      noLike: "fa fa-2x fa-heart liked"
    });
  };

  render() {
    console.log("props", this.props);
    let { property } = this.props;
    // checking the user's favorites to see if any match the current property
    let likeCheck = this.props.favorites.favorites.find(
      fav => fav.owner_post_id === this.props.property.id
    );

    return (
      <div>
        {/* <div className="wrapper_details_contact"> */}
        <div className="propertymain">
          {/* <div className="left_panel"> */}
          <div className="imglike">
            {/* <img src={property.image_url} id="propertyimg" alt="" /> */}
            <div
              style={{ backgroundImage: `url(${property.image_url})` }}
              id="propertyimg"
            >
              {/* Setting function to check for favorited listing...for render red/blank heart */}

              {this.props.isAuthed ? (
                <div>
                  {/* reference likeCheck under render above */}
                  {likeCheck ? (
                    <i id="like-button" className={this.state.liked} />
                  ) : (
                    <i
                      id="like-button"
                      // className="fa fa-2x fa-heart-o not-liked"
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
                  )}
                </div>
              ) : null}
            </div>
          </div>

          <div className="wrapper_panels">
            <div className="property_below_img">
              <Link to="/properties">
                <button>Back to All Listings</button>
              </Link>
              <div className="property_title_add_host">
                <h1 className="propertytitle" id="property_title_color">
                  {property.property_title}
                </h1>
                <div>{property.address}</div>
                <div className="bedbath">
                  {property.beds === 1 ? (
                    <div>
                      <i className="fa fa-bed" /> {property.beds} bed{" "}
                    </div>
                  ) : (
                    <div>
                      <i className="fa fa-bed" /> {property.beds} beds{" "}
                    </div>
                  )}
                  <br />
                  {+property.baths === 1 ? (
                    <div>
                      <i className="fa fa-bath" /> {property.baths} bath{" "}
                    </div>
                  ) : (
                    <div>
                      <i className="fa fa-bath" /> {property.baths} baths{" "}
                    </div>
                  )}
                </div>
                {/* <div>{property.description}</div> */}
                <div className="property_hosted_w_img">
                  Hosted by: {property.user_name}
                  <img src={property.user_avatar} id="avatarimg" alt="" />
                </div>

                {this.props.isAuthed ? (
                  <a
                    href={`mailto:${
                      this.props.property.user_email
                    }?subject=About your property at ${
                      this.props.property.address
                    }`}
                  >
                    <button>Contact</button>
                  </a>
                ) : null}
              </div>
              <div className="property_description">
                <div id="property_title_color">Overview:</div>
                {property.description}
              </div>
              <div className="amenities">
                <ul id="property_title_color">Amenities:</ul>
                <li>{property.amen_1}</li>
                <li>{property.amen_2}</li>
                <li>{property.amen_3}</li>
              </div>
              <div className="ratings_main" id="top_star">
                <StarRatings
                  rating={+property.round}
                  starRatedColor="#1e85ae"
                  numberOfStars={5}
                  starDimension="12px"
                />
                <div className="property_count">{property.count}</div>
              </div>
              <div>${property.price} per night</div>
              <Map
                lat={+this.props.property.lat}
                lng={+this.props.property.lng}
                // address={this.props.property}
                center={{
                  lat: +this.props.property.lat,
                  lng: +this.props.property.lng
                }}
              />

              <div id="property_title_color">
                Reviews: {+this.props.property.count}
              </div>
              {!this.state.reviewsShow ? (
                <div>
                  {this.props.review.length ? (
                    <div>
                      <div>{this.props.review[0].review}</div>
                      <div>Reviewed by: {this.props.review[0].user_name} </div>
                      <div>
                        <Moment fromNow>{this.props.review[0].moment}</Moment>
                        <img
                          id="avatarimg"
                          src={this.props.review[0].user_avatar}
                          alt=""
                        />
                      </div>
                    </div>
                  ) : (
                    <div>No reviews yet. Make the first review!</div>
                  )}
                </div>
              ) : (
                <AllReviews propertyReviews={this.props.review} />
              )}
              {this.props.review.length ? (
                <button onClick={this.toggleReviews}>
                  {!this.state.reviewsShow ? (
                    <p>See All</p>
                  ) : (
                    <p>Minimize Reviews</p>
                  )}
                </button>
              ) : null}

              {this.props.user.userid == this.props.property.user_id ? (
                <div>
                  <div
                    className="delete_btn"
                    onClick={() => this.deleteHandler(property.id)}
                  >
                    <i className="fa fa-trash" />

                    <div>Delete Listing</div>
                  </div>
                  <Link to={`/editproperty/${property.id}`}>
                    <i className="fa fa-edit" />
                    <div>Edit Listing</div>
                  </Link>
                </div>
              ) : (
                <div>
                  {this.props.isAuthed ? (
                    <button
                      onClick={() => this.goToProperty(this.props.property.id)}
                    >
                      Add Review
                    </button>
                  ) : (
                    <div>
                      <a href={process.env.REACT_APP_LOGIN}>
                        <button>Login to add review</button>
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="right_panel">
              <div className="right_group">
                <div className="price_ratings_group_sticky">
                  <div>${property.price} per night</div>
                  <div className="ratings_main">
                    <StarRatings
                      rating={+property.round}
                      starRatedColor="#1e85ae"
                      numberOfStars={5}
                      starDimension="12px"
                    />
                    <div className="property_count">{property.count}</div>
                  </div>
                </div>
                {this.props.isAuthed ? (
                  <button className="sticky_contact">
                    {this.props.isAuthed ? (
                      <a
                        href={`mailto:${
                          this.props.property.user_email
                        }?subject=About your property at ${
                          this.props.property.address
                        }`}
                      >
                        <div className="contact_font_sticky">Contact</div>
                      </a>
                    ) : null}
                  </button>
                ) : (
                  <div>
                    <a
                      href={process.env.REACT_APP_LOGIN}
                      className="sticky_login_foot"
                    >
                      <button className="sticky_login_foot">
                        Login to Contact
                      </button>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="price_contact_sticky">
            <div className="price_ratings_group_sticky">
              <div>${property.price} per night</div>
              <div className="ratings_main">
                <StarRatings
                  rating={+property.round}
                  starRatedColor="#1e85ae"
                  numberOfStars={5}
                  starDimension="12px"
                />
                <div className="property_count">{property.count}</div>
              </div>
            </div>
            {this.props.isAuthed ? (
              <button className="sticky_contact">
                {this.props.isAuthed ? (
                  <a
                    href={`mailto:${
                      this.props.property.user_email
                    }?subject=About your property at ${
                      this.props.property.address
                    }`}
                  >
                    <div className="contact_font_sticky">Contact</div>
                  </a>
                ) : null}
              </button>
            ) : (
              <div>
                <a
                  href={process.env.REACT_APP_LOGIN}
                  className="sticky_login_foot"
                >
                  <button className="sticky_login_foot">
                    Login to Contact
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ properties, user }) => ({ ...properties, ...user });

export default connect(
  mapStateToProps,
  { addFavorite, getFavorites }
)(Property);
