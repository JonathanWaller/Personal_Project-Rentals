import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Favorites.css";

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
          <div className="favorites_single" key={property.id}>
            <div className="favorites_wrapper">
              <div className="favorites_top">
                <img
                  className="favorites_img"
                  src={property.image_url}
                  alt="fav_home"
                />
                <div id="properties_city">{property.city}</div>
                <div>{property.property_title}</div>
                <div>${property.price} per night</div>
              </div>
              <div className="favorites_bottom">
                <button
                  className="favorites_delete_btn"
                  onClick={() => {
                    this.deleteHandler(property.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      });
    return (
      <div className="favorites_main">
        <Link to="/properties">
          <div className="properties_button">Back to all listings</div>
        </Link>
        <h1 className="favorites_title_main">Saved Listings</h1>
        <div className="favorites_list_main">{favorites}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ favorites }) => ({ ...favorites });

export default connect(
  mapStateToProps,
  { getFavorites, getProperties }
)(Favorites);
