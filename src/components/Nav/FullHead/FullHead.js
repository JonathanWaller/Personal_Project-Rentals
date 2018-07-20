import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
// import "./Nav.css";
// import Dehaze from "@material-ui/icons/Dehaze";
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
              onClick={() => this.goToFavorites(this.props.user.user.userid)}
            >
              Favorites
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

// export default withRouter(connect(mapStateToProps)(Nav));
export default withRouter(connect(mapStateToProps)(FullHead));
