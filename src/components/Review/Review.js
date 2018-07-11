import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import StarRatings from "react-star-ratings";
import Moment from "react-moment";
// import Rating from "../Ratings/Rating";

class Review extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      time: new Date(),
      rating: 0
    };
  }

  changeHandler = e => {
    this.setState({
      userInput: e.target.value
    });
  };

  changeRating = (newRating, name) => {
    this.setState({
      rating: newRating
    });
  };

  submitHandler = (review, post_id, user_id, reviewer_id, moment, rating) => {
    axios
      .post("/api/review", {
        review,
        post_id,
        user_id,
        reviewer_id,
        moment,
        rating
      })
      .then(() => this.props.history.replace("/properties"));
  };

  render() {
    // console.log("rating props", this.props);
    console.log("state", this.state);
    console.log("props", this.props);
    return (
      <div>
        <div>Leave Review of {this.props.property.property_title}</div>
        <input
          onChange={e => this.changeHandler(e)}
          placeholder="Enter Review here"
        />
        {/* <Rating property={this.props.property} /> */}
        <StarRatings
          rating={this.state.rating}
          starRatedColor="gold"
          starHoverColor="gold"
          changeRating={this.changeRating}
          numberOfStars={5}
          name="rating"
          starDimension="30px"
        />
        <button
          onClick={() =>
            this.submitHandler(
              this.state.userInput,
              this.props.property.id,
              this.props.property.user_id,
              this.props.user.user.userid,
              this.state.time,
              this.state.rating
            )
          }
        >
          Submit Review
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ properties }) => ({ ...properties });

export default connect(mapStateToProps)(Review);
