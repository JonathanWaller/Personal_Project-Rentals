import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

// import { getProperties } from "../../ducks/propertyReducer";

// import Map from "../Map/Map";
// import { Map } from "../Map/Map";

import "./Property.css";

class Property extends Component {
  deleteHandler = id => {
    axios
      .delete(`/api/property/${id}`)
      .then(() => this.props.history.replace("/properties"));
    // .then(() => this.props.history.push("/properties"));
  };

  render() {
    console.log(this.props);
    console.log(this.props.getProperties);
    // console.log(this.props.property.id);
    let { property } = this.props;
    // let { property } = this.props;

    return (
      <div className="propertymain">
        <img src={property.image_url} id="propertyimg" alt="" />
        <h1 className="propertytitle">{property.property_title}</h1>
        <div>{property.property_location}</div>
        <div className="bedbath">
          <div>{property.beds} bed(s)</div>
          <div>{property.baths} bath(s)</div>
        </div>
        <div>{property.description}</div>
        <div className="amenities">
          <ul id="amenitiestitle">Amenities:</ul>
          <li>{property.amen_1}</li>
          <li>{property.amen_2}</li>
          <li>{property.amen_3}</li>
        </div>
        <div>${property.price} per night</div>
        <button>Email Owner</button>
        <button onClick={() => this.deleteHandler(property.id)}>
          Delete Listing
        </button>
        <button>Edit Listing</button>
        {/* <Map
          containerElement={<div style={{ height: 100 + "%" }} />}
          mapElement={<div style={{ height: 100 + "%" }} />}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = ({ properties }) => ({ ...properties });

export default connect(mapStateToProps)(Property);

// export default connect(({ properties, user }) => ({ properties }))(Property);
