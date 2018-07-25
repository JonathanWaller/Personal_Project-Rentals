import React, { Component } from "react";
import Dehaze from "@material-ui/icons/Dehaze";
import { Link } from "react-router-dom";
import "./Ham.css";

class Ham extends Component {
  render(props) {
    return (
      <div className="wrapper_ham_logo">
        <div className="hammain">
          <div>
            <Dehaze
              style={{ fill: "#404040" }}
              onClick={this.props.handleClick}
            />
          </div>
        </div>
        <Link to="/">
          <div id="restay">
            re<span className="restay">ST</span>ay
          </div>
        </Link>
      </div>
    );
  }
}

export default Ham;
