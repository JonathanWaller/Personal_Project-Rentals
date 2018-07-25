import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./FullHead.css";

import { connect } from "react-redux";

class FullHead extends Component {
  goToFavorites = id => {
    this.props.history.push(`/favorites/${id}`);
  };

  render(props) {
    // console.log(this.props);
    return (
      <div className="fullmain" onMouseLeave={this.props.exitSliderHandler}>
        <div className="nav_links">
          <Link to="/">Home</Link>
          {this.props.user.isAuthed ? (
            <div
              className="favorites_link"
              onClick={() => this.goToFavorites(this.props.user.user.userid)}
            >
              Saved
            </div>
          ) : null}
          <Link to="/properties">Listings</Link>
          <Link to="/about">About</Link>
          {!this.props.user.isAuthed ? (
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

export default withRouter(connect(mapStateToProps)(FullHead));
