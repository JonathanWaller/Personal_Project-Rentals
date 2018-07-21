import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import StarRatings from "react-star-ratings";
import "./SingleProperty.css";

import { getProperty } from "../../ducks/propertyReducer";

class SingleProperty extends Component {
  constructor() {
    super();
  }

  goToProperty = id => {
    this.props
      .getProperty(id)
      .then(() => this.props.history.push(`/property/${id}`));
  };

  render(props) {
    console.log("singleProp props", this.props);
    return (
      <div className="whole_card">
        <div
          className="singlecard"
          onClick={() => this.goToProperty(this.props.id)}
        >
          <img className="singleimg" src={this.props.image} />
          <div>{this.props.city}</div>
          <div>{this.props.title}</div>
          {/* <div>Baths: {this.props.baths}</div>
          <div>Beds: {this.props.beds}</div> */}
          <div>${this.props.rate} per night </div>
          <div className="ratings_main">
            <StarRatings
              rating={+this.props.round}
              starRatedColor="navy"
              numberOfStars={5}
              starDimension="8px"
            />
            <div className="single_count">{this.props.count}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ properties }) => ({ ...properties });

export default withRouter(
  connect(
    mapStateToProps,
    { getProperty }
  )(SingleProperty)
);
