import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

import { connect } from "react-redux";

class Nav extends Component {
  render() {
    return (
      <div className="navmain">
        <div className="nav_links">
          <Link to="/">Home</Link>
          <Link to="/properties">Listings</Link>
          {!this.props.user.isAuthed ? (
            // <Link to="/login">Login</Link>
            <a href={process.env.REACT_APP_LOGIN}>
              <div>Login</div>
            </a>
          ) : (
            <a href={process.env.REACT_APP_LOGOUT}>Logout</a>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Nav);
