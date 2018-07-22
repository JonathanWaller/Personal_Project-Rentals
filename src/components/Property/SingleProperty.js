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
          {/* <img className="singleimg" src={this.props.image} /> */}
          <div
            style={{ backgroundImage: `url(${this.props.image})` }}
            className="singleimg"
          />
          <div className="single_card_text">
            <div className="city_name">{this.props.city}</div>
            <div className="single_card_prop_title">{this.props.title}</div>
            {/* <div>Baths: {this.props.baths}</div>
          <div>Beds: {this.props.beds}</div> */}
            <div className="rate_font">${this.props.rate} per night </div>
            <div className="ratings_main">
              <StarRatings
                rating={+this.props.round}
                // starRatedColor="#00797E"
                starRatedColor="#1e85ae"
                numberOfStars={5}
                starDimension="13px"
              />
              <div className="single_count">{this.props.count}</div>
            </div>
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
