import React, { Component } from "react";
import { connect } from "react-redux";

import { getFavorites } from "../../ducks/favoritesReducer";

class Favorites extends Component {
  componentDidMount() {
    this.props.getFavorites(this.props.match.params.id);
  }
  render() {
    console.log(this.props);
    console.log(this.props.properties);
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
    return <div>{favorites}</div>;
  }
}

const mapStateToProps = ({ favorites }) => ({ ...favorites });

export default connect(
  mapStateToProps,
  { getFavorites }
)(Favorites);
