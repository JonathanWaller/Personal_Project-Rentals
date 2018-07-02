import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";

import "./Home.css";

class Home extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    // console.log(this.props);
    return (
      <div>
        {!this.props.isAuthed ? (
          <div>
            {/* <p>Not Logged In</p> */}
            <div className="homemain">
              <img className="homeimage" />
              <Link to="/properties">
                <button className="enterbutton">Enter</button>
              </Link>
            </div>
          </div>
        ) : (
          <p>{JSON.stringify(this.props.user)}</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ ...user });

export default connect(
  mapStateToProps,
  { getUser }
)(Home);
