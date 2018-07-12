import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import "./Map.css";
import Room from "@material-ui/icons/Room";

// const Marker = ({ text }) => <div>{text}</div>;
const Marker = props => {
  return <Room className="pin" />;
};

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

  render() {
    console.log("map props", this.props);
    return (
      <div style={{ height: "20vh", width: "100%" }}>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.state.zoom}
        >
          <Marker lat={this.props.lat} lng={this.props.lng} />
        </GoogleMapReact>
      </div>
    );
  }
}

<Map isMarkerShown />;

export default Map;
