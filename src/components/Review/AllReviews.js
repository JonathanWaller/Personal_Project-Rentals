import React, { Component } from "react";
import Moment from "react-moment";

class AllReviews extends Component {
  render() {
    console.log(this.props);
    let myReviews = this.props.propertyReviews.map(elem => {
      return (
        <div key={elem.id}>
          <div>{elem.review}</div>
          <div>Reviewed by: {elem.user_name}</div>
          <div>
            <Moment fromNow>{elem.moment}</Moment>
          </div>
        </div>
      );
    });
    return (
      <div>
        <p>test</p>
        {myReviews}
      </div>
    );
  }
}

export default AllReviews;
