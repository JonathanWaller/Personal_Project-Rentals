import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import { getFavorites } from "../../ducks/favoritesReducer";
import { getProperties } from "../../ducks/propertyReducer";

class Favorites extends Component {
  componentDidMount() {
    this.props.getFavorites(this.props.match.params.id);
  }

  deleteHandler = id => {
    console.log(id);
    axios
      .delete(`/api/favorite/${id}`)
      .then(() => this.props.getFavorites(this.props.match.params.id));
  };

  render() {
    console.log("favorites props", this.props);
    // console.log(this.props.properties);
    let favorites =
      this.props.favorites &&
      this.props.favorites.map(property => {
        // console.log(property);
        return (
          <div key={property.id}>
            <div>{property.property_title}</div>
            <div>{property.city}</div>
            <div>${property.price}</div>
            <button
              onClick={() => {
                this.deleteHandler(property.id);
              }}
            >
              Delete From Favorites
            </button>
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
