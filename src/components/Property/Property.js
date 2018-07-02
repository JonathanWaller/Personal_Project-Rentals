import React, { Component } from "react";
import { connect } from "react-redux";

import "./Property.css";

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
      <div className="propertymain">
        <h1 id="propertyimg">IMAGE</h1>
        <h1 className="propertytitle">{property.property_title}</h1>
        <div>{property.property_location}</div>
        <div className="bedbath">
          <div>{property.beds} bed(s)</div>
          <div>{property.baths} bath(s)</div>
        </div>
        <div>{property.description}</div>
        <div className="amenities">
          <div id="amenitiestitle">Amenities:</div>
          <div>{property.amenities}</div>
        </div>
        <div>${property.price} per night</div>
        <button>Email Owner</button>
      </div>
    );
  }
}

export default connect(({ properties }) => ({ properties }))(Property);
