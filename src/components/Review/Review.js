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
    // const date = "1976-04-19T12:59-0500";
    console.log(this.state.time);
    console.log("without state", new Date());
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
              this.props.user.user.id,
              // <Moment>{date}</Moment>
              // <Moment fromNow>1976-04-19T12:59-0500</Moment>
              // <Moment fromNow>{this.state.time}</Moment>
              this.state.time
            )
          }
        >
          Submit Review
        </button>
        {/* <Moment fromNow>{this.state.time}</Moment> */}
        <Moment fromNow>{new Date()}</Moment>
      </div>
    );
  }
}

const mapStateToProps = ({ properties }) => ({ ...properties });

export default connect(mapStateToProps)(Review);
