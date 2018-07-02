import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Properties.css";

//dispatchers
import { getProperties } from "../../ducks/propertyReducer";

class Properties extends Component {
  componentDidMount() {
    this.props.getProperties();
  }

  goToProperty = id => {
    // console.log(this.props);
    // console.log(this.props.properties);
    // console.log(this.props.history);
    // console.log(id);
    this.props.history.push(`/property/${id}`);
  };

  render() {
    // console.log(this.props.properties);
    let myProperties = this.props.properties.map((property, ind) => {
      return (
        <div
          onClick={() => this.goToProperty(property.id)}
          key={property.id}
          className="propertieslist"
        >
          <div id="propertiesimg">Image Goes Here</div>
          <div>{property.property_title}</div>
          <div>{property.property_location}</div>
          <div>Baths: {property.baths}</div>
          <div>Beds: {property.beds}</div>
          <div>Rate: ${property.price}</div>
        </div>
      );
    });
    return (
      <div>
        <Link to="/addproperty">
          <button>Add Listing</button>
        </Link>
        <div>{myProperties}</div>
      </div>
    );
  }
}

// const mapStateToProps = state => state;
const mapStateToProps = ({ properties }) => ({ ...properties });

export default connect(
  mapStateToProps,
  { getProperties }
)(Properties);
