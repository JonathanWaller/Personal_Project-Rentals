import React, { Component } from "react";

import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";

class Home extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    return <div>Home Page</div>;
  }
}

const mapStateToProps = ({ user }) => ({ ...user });

export default connect(
  mapStateToProps,
  { getUser }
)(Home);
