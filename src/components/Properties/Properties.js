import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Properties.css";

//dispatchers
import { getProperties } from "../../ducks/propertyReducer";
import { getUser } from "../../ducks/userReducer";

class Properties extends Component {
  constructor() {
    super();
    this.state = {
      filterString: ""
    };
  }
  componentDidMount() {
    this.props.getProperties();
  }

  goToProperty = id => {
    // console.log(this.props);
    this.props.history.push(`/property/${id}`);
  };

  cityHandler = e => {
    this.setState({ filterString: e.target.value });
  };

  render() {
    console.log(this.props);
    // console.log(this.props.properties[0].property_location);
    // let myProperties = this.props.properties.map((property, ind) => {
    //   return (
    //     <div
    //       onClick={() => this.goToProperty(property.id)}
    //       key={property.id}
    //       className="propertieslist"
    //     >
    //       {/* <div id="propertiesimg">Image Goes Here</div> */}
    //       <img src={property.image_url} id="propertiesimg" alt="" />
    //       <div>{property.property_title}</div>
    //       <div>{property.property_location}</div>
    //       <div>Baths: {property.baths}</div>
    //       <div>Beds: {property.beds}</div>
    //       <div>Rate: ${property.price}</div>
    //     </div>
    //   );
    // });

    let searchDisplay = this.props.properties
      .filter((property, ind) => {
        console.log(property);
        console.log(property.property_location);
        return property.property_location.includes(
          this.state.filterString.charAt(0).toUpperCase()
        );
      })
      .map((property, ind) => {
        return (
          <div
            onClick={() => this.goToProperty(property.id)}
            key={property.id}
            className="propertieslist"
          >
            {/* <div id="propertiesimg">Image Goes Here</div> */}
            <img src={property.image_url} id="propertiesimg" alt="" />
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
        <input onChange={e => this.cityHandler(e)} placeholder="search city" />
        <br />
        <Link to="/addproperty">
          <button>Add Listing</button>
        </Link>
        {/* <div>{myProperties}</div> */}
        <div>{searchDisplay}</div>
      </div>
    );
  }
}

// const mapStateToProps = state => state;
const mapStateToProps = ({ properties, user }) => ({ ...properties, ...user });

export default connect(
  mapStateToProps,
  { getProperties, getUser }
)(Properties);
