import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";
import Properties from "../Properties/Properties";
import { getProperties } from "../../ducks/propertyReducer";
import axios from "axios";
import SingleProperty from "../Property/SingleProperty";
import Property from "../Property/Property";
// import StarRatings from 'react-star-ratings'
// import Rating from "../Ratings/Rating";
// import { Button } from "react-bootstrap";

import "./Home.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      searchProperties: []
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
    axios.get(`/api/properties?address=${this.state.search}`).then(response => {
      console.log(response);
      this.setState({ searchProperties: response.data });
    });
  };

  // handleSearchSubmit = () => {
  //   axios.get(`/api/properties?address=${this.state.search}`);
  // };

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
            />
            {/* <Properties /> */}
          </div>
        );
      });

    return (
      // <div>
      //   <div>
      //     {/* <p>Not Logged In</p> */}
      //     <div className="homemain">
      //       <img className="homeimage" alt="" />
      //       <Link to="/properties">
      //         <button className="enterbutton">Enter</button>
      //       </Link>
      //     </div>
      //   </div>
      // </div>

      <div>
        {!this.props.isAuthed ? (
          <div>
            <header className="homemain">
              {/* <img className="homeimage" alt="" /> */}
              <div className="header_text-box">
                <h1 className="heading-primary">
                  <span className="heading-primary---main">Welcome Home</span>
                </h1>
                {/* <div>Search Cities</div> */}
                <Link to="/properties">
                  <span className="enterbutton">Enter</span>
                </Link>
                <input
                  onChange={e => this.handleSearchInput(e)}
                  placeholder="search city"
                />
                <button onClick={() => this.handleSearchSubmit()}>
                  Search
                </button>
              </div>

              {/* <form
                onSubmit={e => {
                  e.preventDefault();
                  this.props.history.push(`/properties?q=${this.state.search}`);
                }}
              >
                <input
                  onChange={e => this.setState({ search: e.target.value })}
                />
              </form> */}

              {/* <Link to="/properties">
                <button className="enterbutton">Enter</button>
              </Link> */}
            </header>
            {searchProperties}
          </div>
        ) : (
          <Properties />
          // <p>{JSON.stringify(this.props.user)}</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ user, properties }) => ({ ...user, ...properties });

export default connect(
  mapStateToProps,
  { getUser, getProperties }
)(Home);
