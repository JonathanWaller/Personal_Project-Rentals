import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";
import Properties from "../Properties/Properties";
import { getProperties } from "../../ducks/propertyReducer";
import { getReviews } from "../../ducks/reviewReducer";
import axios from "axios";
import SingleProperty from "../Property/SingleProperty";
import Property from "../Property/Property";
import FontAwesome from "react-fontawesome";
import TextField from "@material-ui/core/TextField";
import StarRatings from "react-star-ratings";
// import StarRatings from 'react-star-ratings'
// import Rating from "../Ratings/Rating";
// import { Button } from "react-bootstrap";

import "./Home.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      searchProperties: [],
      searchTermDisplay: false
    };
  }
  componentDidMount() {
    this.props.getUser();
    this.props.getProperties();
  }

  handleSearchInput = e => {
    this.setState({ search: e.target.value });
  };

  handleSearchSubmit = () => {
    axios
      .get(`/api/properties?address=${this.state.search}`)
      .then(response => {
        // console.log(response);
        this.setState({ searchProperties: response.data });
      })
      .then(() => {
        this.props.getReviews();
      })
      .then(() => {
        this.setState({ searchTermDisplay: true });
      });
  };

  render() {
    console.log("home props", this.props);
    let searchProperties =
      this.state.searchProperties &&
      this.state.searchProperties.map((property, i) => {
        console.log(property);
        return (
          <div key={i}>
            <SingleProperty
              image={property.image_url}
              title={property.property_title}
              city={property.city}
              baths={property.baths}
              beds={property.beds}
              rate={property.price}
              id={property.id}
              round={property.round}
            />
            {/* <Properties /> */}
          </div>
        );
      });

    return (
      <div>
        {!this.props.isAuthed ? (
          <div className="home-all">
            <header className="homemain">
              {/* <img className="homeimage" alt="" /> */}
              <div className="header_text-box">
                <h1 className="heading-primary">
                  <span className="heading-primary---main">Welcome Home</span>
                </h1>
                <Link to="/properties">
                  {/* <div className="enter_box"> */}
                  <span className="enterbutton">Enter</span>
                  {/* </div> */}
                </Link>
                <form
                  className="search"
                  onSubmit={() => this.handleSearchSubmit()}
                >
                  <span className="fa fa-search" id="my_search" />
                  <input
                    className="search-term"
                    onChange={e => this.handleSearchInput(e)}
                    placeholder="Try &quot;Dallas&quot; or &quot;CA&quot;"
                  />
                </form>
              </div>
            </header>
            {this.state.searchTermDisplay ? (
              <h1>Search term: "{this.state.search}"</h1>
            ) : null}
            {searchProperties}
          </div>
        ) : (
          <Properties />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ user, properties }) => ({ ...user, ...properties });

export default connect(
  mapStateToProps,
  { getUser, getProperties, getReviews }
)(Home);
