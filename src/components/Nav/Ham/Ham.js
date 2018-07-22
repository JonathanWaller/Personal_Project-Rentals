import React, { Component } from "react";
import Dehaze from "@material-ui/icons/Dehaze";
import "./Ham.css";

class Ham extends Component {
  render(props) {
    return (
      <div className="hammain">
        <div>
          <Dehaze
            style={{ fill: "#404040" }}
            onClick={this.props.handleClick}
          />
        </div>
      </div>
    );
  }
}

export default Ham;
