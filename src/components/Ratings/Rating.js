import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import axios from "axios";

import { connect } from "react-redux";

// import { updateRating } from "../../ducks/ratingReducer";

class Rating extends Component {
  constructor() {
    super();
    this.state = {
      rating: 0
    };
  }

  changeRating = (newRating, name) => {
    this.setState({
      rating: newRating
    });
  };

  //   changeRating = newRating => {
  //     this.props.updateRating(newRating);
  //   };

  //   changeRating = (newRating, reviewer_id, post_id) => {
  //     this.props.updateRating(newRating);
  //       .then(() => axios.post("/api/review", {newRating, this.props.user.id, }));
  //   };

  render() {
    // console.log("state", this.state);
    console.log("props", this.props);
    return (
      <div>
        <StarRatings
          rating={this.props.rating}
          starRatedColor="blue"
          changeRating={this.changeRating}
          numberOfStars={5}
          name="rating"
        />
      </div>
    );
  }
}

const mapStateToProps = ({ rating, user }) => ({ ...rating, ...user });

export default connect(
  mapStateToProps
  //   { updateRating }
)(Rating);
