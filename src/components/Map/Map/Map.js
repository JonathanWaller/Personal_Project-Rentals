// import React, { Component } from "react";
// import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

// class Map extends Component {
//   render() {
//     const markers = this.props.markers || [];

//     return (
//       <div>
//         <p>howdy</p>
//         {/* <GoogleMap
//           defaultZoom={3}
//           defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
//         >
//           {markers.map((marker, index) => <Marker {...marker} />)}
//         </GoogleMap> */}
//       </div>
//     );
//   }
// }
// // export default withGoogleMap(Map);
// // export default Map;

import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

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
    // console.log(this.props);
    // console.log(this.state);
    return (
      //   <p>test from next</p>
      // Important! Always set the container height explicitly
      <div style={{ height: "20vh", width: "100%" }}>
        <GoogleMapReact
          // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
          //   defaultCenter={this.props.center}
          //   defaultZoom={this.props.zoom}
          defaultCenter={this.state.center}
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

export default Map;
