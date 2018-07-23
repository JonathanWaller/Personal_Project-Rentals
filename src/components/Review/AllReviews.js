import React, { Component } from "react";
import Moment from "react-moment";
import "./AllReviews.css";

class AllReviews extends Component {
  render() {
    console.log(this.props);
    let myReviews = this.props.propertyReviews.map(elem => {
      return (
        <div key={elem.id} className="reviews_main">
          <div className="above_review">
            <div className="review_left">
              <img id="avatarimg" src={elem.user_avatar} alt="" />
            </div>
            <div className="review_right">
              <div>{elem.user_name}</div>
              <div>
                <Moment fromNow>{elem.moment}</Moment>
              </div>
            </div>
          </div>
          <div className="review_review">{elem.review}</div>
        </div>
      );
    });
    return <div>{myReviews}</div>;
  }
}

export default AllReviews;
