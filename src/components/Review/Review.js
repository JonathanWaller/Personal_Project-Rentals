import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import StarRatings from "react-star-ratings";
import Moment from "react-moment";

class Review extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      time: new Date()
    };
  }

  changeHandler = e => {
    this.setState({
      userInput: e.target.value
    });
  };

  submitHandler = (review, post_id, user_id, reviewer_id, moment) => {
    axios
      .post("/api/review", { review, post_id, user_id, reviewer_id, moment })
      .then(() => this.props.history.replace("/properties"));
  };

  render() {
    return (
      <div>
        <div>Leave Review of {this.props.property.property_title}</div>
        <input
          onChange={e => this.changeHandler(e)}
          placeholder="Enter Review here"
        />
        <button
          onClick={() =>
            this.submitHandler(
              this.state.userInput,
              this.props.property.id,
              this.props.property.user_id,
              this.props.user.user.id,

              this.state.time
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
