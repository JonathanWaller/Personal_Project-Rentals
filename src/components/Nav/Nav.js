import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./Nav.css";

import { connect } from "react-redux";

class Nav extends Component {
  goToFavorites = id => {
    this.props.history.push(`/favorites/${id}`);
  };

  render() {
    console.log(this.props);
    console.log(this.props.user.userid);
    console.log(this.props.user.user.userid);
    return (
      <div className="navmain">
        <div className="nav_links">
          <Link to="/">Home</Link>
          {this.props.user.isAuthed ? (
            <div
              onClick={() => this.goToFavorites(this.props.user.user.userid)}
            >
              Favorites
            </div>
          ) : null}
          {/* <Link to="/favorites">Favorites</Link> */}
          {/* <Link to=`/favorites/${this.props.user.userid}`>Favorites</Link> */}
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

export default withRouter(connect(mapStateToProps)(Nav));
