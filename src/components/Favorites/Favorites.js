import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getFavorites } from "../../ducks/favoritesReducer";
import { getProperties } from "../../ducks/propertyReducer";

class Favorites extends Component {
  componentDidMount() {
    this.props.getFavorites(this.props.match.params.id);
  }
  render() {
    console.log(this.props);
    // console.log(this.props.properties);
    let favorites =
      this.props.properties &&
      this.props.properties.map(property => {
        return (
          <div key={property.id}>
            <div>{property.property_title}</div>
            <div>{property.city}</div>
            <div>${property.price}</div>
          </div>
        );
      });
    return (
      <div>
        <Link to="/properties">
          <button>Back to All Listings</button>
        </Link>
        <div>{favorites}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ favorites }) => ({ ...favorites });

export default connect(
  mapStateToProps,
  { getFavorites, getProperties }
)(Favorites);
