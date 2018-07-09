import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import StarRatings from "react-star-ratings";

class Review extends Component {
  constructor() {
    super();
    this.state = {
      userInput: ""
    };
  }

  changeHandler = e => {
    this.setState({
      userInput: e.target.value
    });
  };

  submitHandler = (review, post_id, user_id, reviewer_id) => {
    axios
      .post("/api/review", { review, post_id, user_id, reviewer_id })
      .then(() => this.props.history.replace("/properties"));
  };

  render() {
    // console.log("this is state", this.state);
    // console.log("this is props", this.props);
    // console.log(this.props.property.id);
    // console.log(this.props.user.user.id);
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
              this.props.user.user.id
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
