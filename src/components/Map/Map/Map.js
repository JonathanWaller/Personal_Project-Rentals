import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  constructor() {
    super();
    this.state = {
      center: {
        lat: 32.8653014,
        lng: -96.75820979999997
      },
      zoom: 11
    };
  }
  //   static defaultProps = {
  //     center: {
  //       lat: 32.7774166,
  //       lng: -96.79590480000002
  //     },
  //     zoom: 11
  //   };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "20vh", width: "100%" }}>
        <GoogleMapReact
          // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
          //   defaultCenter={this.props.center}
          //   defaultZoom={this.props.zoom}
          // defaultCenter={this.state.center}
          defaultCenter={this.props.center}
          defaultZoom={this.state.zoom}
        >
          {/* {props.isMarkerShown && <Marker position={{lat: 32.8653014 , lng: -96.75820979999997 }}} */}
          {/* <AnyReactComponent
            lat={32.8653014}
            lng={-96.75820979999997}
            text={"Kreyser Avrora"}
          /> */}
        </GoogleMapReact>
      </div>
    );
  }
}

<Map isMarkerShown />;

// const mapStateToProps = ({ location }) => ({ ...location });
// const mapStateToProps = ({ properties }) => ({ ...properties });

export default Map;
