import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

import { connect } from "react-redux";

class Nav extends Component {
  // constructor() {
  //   super();
  // }

  render() {
    // console.log(this.props);
    return (
      <div className="navmain">
        <div className="nav_links">
          <Link to="/">Home</Link>
          <Link to="/properties">Listings</Link>
          <Link to="/login">Login</Link>
          {/* <div>Logout</div> */}
          <a href={process.env.REACT_APP_LOGOUT}>Logout</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Nav);
