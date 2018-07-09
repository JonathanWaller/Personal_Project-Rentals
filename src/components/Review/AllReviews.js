import React, { Component } from "react";

class AllReviews extends Component {
  render() {
    console.log(this.props);
    let myReviews = this.props.propertyReviews.map(elem => {
      return (
        <div key={elem.id}>
          <div>{elem.review}</div>
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
