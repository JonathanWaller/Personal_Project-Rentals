import React, { Component } from "react";
import { connect } from "react-redux";

class Property extends Component {
  render() {
    let { property } = this.props;
    // console.log(this.props);
    // console.log(this.props.properties);
    // console.log(this.props.properties.properties);

    console.log(this.props);
    // console.log(this.props.properties.properties);
    // let { property } = this.props;
    console.log(this.props.match.params.id);
    console.log(typeof this.props.match.params.id);

    return (
      <div>
        <h1>IMAGE</h1>
        <h1>{property.property_title}</h1>
        <div>{property.property_location}</div>
        <div>{property.description}</div>
        <div>
          <div>Amenities:</div>
          <div>{property.amenities}</div>
        </div>
        <div>${property.price} per night</div>
      </div>
    );
  }
}

export default connect(({ properties }) => ({ properties }))(Property);
