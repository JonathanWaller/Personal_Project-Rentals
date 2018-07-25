import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./Nav.css";
import Dehaze from "@material-ui/icons/Dehaze";
import Ham from "./Ham/Ham";
import FullHead from "./FullHead/FullHead";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      hamShow: true,
      linksShow: false
    };
  }
  goToFavorites = id => {
    this.props.history.push(`/favorites/${id}`);
  };

  handleClick = () => {
    this.setState({
      hamShow: false,
      linksShow: true
    });
  };

  exitSliderHandler = () => {
    this.setState({
      hamShow: true,
      linksShow: false
    });
  };

  render() {
    // console.log(this.props);
    return (
      <div className="navmain">
        {this.state.hamShow ? (
          <div>
            <Ham handleClick={this.handleClick} />
            {/* <Link to="/properties">Listings</Link> */}
          </div>
        ) : (
          <FullHead exitSliderHandler={this.exitSliderHandler} />
        )}

        {/* <div className="test"> */}
        {/* <div id="resty">
            re<span className="restay">ST</span>ay
          </div> */}
        <div className="home_list_about_login">
          <div className="nav-right">
            {/* <div className="test"> */}
            {/* <div>
              re<span className="restay">ST</span>ay
            </div> */}
            <div className="full-nav-links">
              {/* <div className="nav_links"> */}
              {/* <Link to="/">Home</Link> */}
              <Link to="/properties">Listings</Link>
              {this.props.user.isAuthed ? (
                <div
                  className="nav_favorites_btn"
                  onClick={() =>
                    this.goToFavorites(this.props.user.user.userid)
                  }
                >
                  Saved
                </div>
              ) : null}
              <Link to="/about">About</Link>
            </div>
          </div>
          {!this.props.user.isAuthed ? (
            <div>
              <a href={process.env.REACT_APP_LOGIN}>
                <div>Login</div>
              </a>
            </div>
          ) : (
            <a href={process.env.REACT_APP_LOGOUT}>Logout</a>
          )}

          {this.props.user.isAuthed ? (
            <img
              src={this.props.user.user.user_avatar}
              className="userimg"
              alt=""
            />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps)(Nav));
