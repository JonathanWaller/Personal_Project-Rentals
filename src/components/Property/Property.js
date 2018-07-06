import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import EditListing from "../EditListing/EditListing";

// import { getProperties } from "../../ducks/propertyReducer";

// import Map from "../Map/Map";
// import { Map } from "../Map/Map";

import "./Property.css";

class Property extends Component {
  constructor() {
    super();
    this.state = {
      propertyShow: true,
      editShow: false
    };
  }
  deleteHandler = id => {
    axios
      .delete(`/api/property/${id}`)
      .then(() => this.props.history.replace("/properties"));
    // .then(() => this.props.history.push("/properties"));
  };

  toggleView = () => {
    this.setState({
      propertyShow: !this.state.propertyShow,
      editShow: !this.state.editShow
    });
  };

  render() {
    // console.log(this.state);
    console.log(this.props);
    console.log("listing title", this.props.property.property_title);
    console.log("looocation", this.props.property.property_location);
    // console.log(this.props.getProperties);
    // console.log(this.props.property.id);
    // console.log(this.props.property.user_id);
    let { property } = this.props;
    // let { property } = this.props;

    return (
      <div>
        {this.state.propertyShow ? (
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
            {/* <Link
          to="/editproperty"
          myid={this.props.property.id}
          user_id={this.props.property.user_id} */}
            <button onClick={() => this.toggleView()}>Edit Listing</button>

            {/* <Map
          containerElement={<div style={{ height: 100 + "%" }} />}
          mapElement={<div style={{ height: 100 + "%" }} />}
        /> */}
          </div>
        ) : (
          <EditListing
            toggleView={this.toggleView}
            id={this.props.property.id}
            user_id={this.props.property.user_id}
            title={this.props.property.property_title}
            myLocation={this.props.property.property_location}
            beds={this.props.property.beds}
            baths={this.props.property.baths}
            desc={this.props.property.description}
            amen1={this.props.property.amen_1}
            amen2={this.props.property.amen_2}
            amen3={this.props.property.amen_3}
            price={this.props.property.price}
            myImage={this.props.property.image_url}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ properties }) => ({ ...properties });

export default connect(mapStateToProps)(Property);

// export default connect(({ properties, user }) => ({ properties }))(Property);
