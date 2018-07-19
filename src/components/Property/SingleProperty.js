import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

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
      // <div onClick={this.goToProperty(this.props.id)}>
      <div onClick={() => this.goToProperty(this.props.id)}>
        <div>
          <img src={this.props.image} />
          <div>{this.props.title}</div>
          <div>Baths: {this.props.baths}</div>
          <div>Beds: {this.props.beds}</div>
          <div>Rate: ${this.props.rate} </div>
        </div>
        //{" "}
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
