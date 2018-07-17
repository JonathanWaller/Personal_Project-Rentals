import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";
import Properties from "../Properties/Properties";
// import Rating from "../Ratings/Rating";
// import { Button } from "react-bootstrap";

import "./Home.css";

class Home extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  render() {
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
            <div className="homemain">
              <img className="homeimage" alt="" />
              <div>Welcome Home</div>

              <Link to="/properties">
                <button className="enterbutton">Enter</button>
              </Link>
            </div>
          </div>
        ) : (
          <Properties />
          // <p>{JSON.stringify(this.props.user)}</p>
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
