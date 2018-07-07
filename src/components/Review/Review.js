import React, { Component } from "react";

class Review extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div>Leave Review of NAME</div>
        <input placeholder="Enter Review here" />
      </div>
    );
  }
}

export default Review;
