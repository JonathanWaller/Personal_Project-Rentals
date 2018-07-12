import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import EditListing from "../EditListing/EditListing";
import Map from "../Map/Map/Map";
import Review from "../Review/Review";
import AllReviews from "../Review/AllReviews";
import Moment from "react-moment";
import StarRatings from "react-star-ratings";

// import { getProperties } from "../../ducks/propertyReducer";

// import Map from "../Map/Map";
// import { Map } from "../Map/Map";

import "./Property.css";

class Property extends Component {
  constructor() {
    super();
    this.state = {
      propertyShow: true,
      editShow: false,
      reviewsShow: false
      // addReviewShow: false
    };
  }
  deleteHandler = id => {
    axios
      .delete(`/api/property/${id}`)
      .then(() => this.props.history.replace("/properties"));
    // .then(() => this.props.history.push("/properties"));
  };

  toggleEditView = () => {
    this.setState({
      propertyShow: !this.state.propertyShow,
      editShow: !this.state.editShow
    });
  };

  toggleReviews = () => {
    this.setState({
      reviewsShow: !this.state.reviewsShow
    });
  };

  // toggleAddReview = ()=>{
  //   this.setState({
  //     propertyShow: !this.state.propertyShow,
  //     addReviewShow: !this.state.editShow
  //   });
  // }

  goToProperty = id => {
    this.props.history.push(`/addReview/${id}`);
  };

  render() {
    console.log(this.props);
    let { property } = this.props;
    // let ratings =
    // console.log(Math.avg(2, 3, 5));
    // let { property } = this.props;

    return (
      <div>
        {this.state.propertyShow ? (
          <div className="propertymain">
            <img src={property.image_url} id="propertyimg" alt="" />
            <h1 className="propertytitle">{property.property_title}</h1>
            <div>{property.address}</div>
            <div className="bedbath">
              {property.beds === 1 ? (
                <div>{property.beds} bed </div>
              ) : (
                <div>{property.beds} beds </div>
              )}
              {property.baths === 1 ? (
                <div>{property.baths} bath </div>
              ) : (
                <div>{property.baths} bath </div>
              )}
            </div>
            <div>{property.description}</div>
            <div>
              Hosted by: {property.user_name}
              <img src={property.user_avatar} id="avatarimg" />
            </div>
            <a
              href={`mailto:${
                this.props.property.user_email
              }?subject=About your property at ${this.props.property.address}`}
            >
              <button>contact {property.user_name}</button>
            </a>
            <div className="amenities">
              <ul id="amenitiestitle">Amenities:</ul>
              <li>{property.amen_1}</li>
              <li>{property.amen_2}</li>
              <li>{property.amen_3}</li>
            </div>
            <StarRatings
              rating={+property.round}
              starRatedColor="gold"
              numberOfStars={5}
              starDimension="16px"
            />
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
            <div>Reviews</div>
            {!this.state.reviewsShow ? (
              <div>
                {this.props.review.length ? (
                  <div>
                    <div>{this.props.review[0].review}</div>
                    <div>Reviewed by: {this.props.review[0].user_name} </div>
                    <div>
                      <Moment fromNow>{this.props.review[0].moment}</Moment>
                      <img
                        width="30"
                        height="30"
                        src={this.props.review[0].user_avatar}
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
                  <p>See All Reviews</p>
                ) : (
                  <p>Minimize Reviews</p>
                )}
              </button>
            ) : null}
            {/* <a
              href={`mailto:${
                this.props.property.user_email
              }?subject=About your property at ${this.props.property.address}`}
            >
              <button>Email Owner</button>
            </a> */}
            <button onClick={() => this.deleteHandler(property.id)}>
              Delete Listing
            </button>
            <button onClick={() => this.toggleEditView()}>Edit Listing</button>
            <button onClick={() => this.goToProperty(this.props.property.id)}>
              Add Review
            </button>
          </div>
        ) : (
          <EditListing
            toggleView={this.toggleView}
            id={this.props.property.id}
            user_id={this.props.property.user_id}
            title={this.props.property.property_title}
            address={this.props.property.address}
            lat={this.props.property.lat}
            lng={this.props.property.lng}
            city={this.props.property.city}
            beds={this.props.property.beds}
            baths={this.props.property.baths}
            desc={this.props.property.description}
            amen1={this.props.property.amen_1}
            amen2={this.props.property.amen_2}
            amen3={this.props.property.amen_3}
            price={this.props.property.price}
            myImage={this.props.property.image_url}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ properties, user }) => ({ ...properties, ...user });

export default connect(mapStateToProps)(Property);

// export default connect(({ properties, user }) => ({ properties }))(Property);
