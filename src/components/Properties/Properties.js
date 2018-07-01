import React, { Component } from "react";
import { connect } from "react-redux";

//dispatchers
import { getProperties } from "../../ducks/propertyReducer";

class Properties extends Component {
  componentDidMount() {
    this.props.getProperties();
  }

  render() {
    console.log(this.props.properties);
    let myProperties = this.props.properties.map((property, ind) => {
      return (
        <div key={property.id}>
          <h1>{property.property_title}</h1>
        </div>
      );
    });
    return (
      <div>{myProperties}</div>
      //   <div>
      //     {this.props.properties[0] ? (
      //       this.props.properties.map((property, ind) => (
      //         <div key={property.id}>
      //           <h1>{property.title}</h1>
      //         </div>
      //       ))
      //     ) : (
      //       <div>No Properties</div>
      //     )}
      //   </div>
    );
  }
}

// const mapStateToProps = state => state;
const mapStateToProps = ({ properties }) => ({ ...properties });

export default connect(
  mapStateToProps,
  { getProperties }
)(Properties);
