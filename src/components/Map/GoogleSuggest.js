// import React, { Component } from "react";
// import GoogleMapLoader from "react-google-maps-loader";
// import GooglePlacesSuggest from "react-google-places-suggest";

// const MY_API_KEY = "AIzaSyAfGXq8MWx2X7bFwbmUTBIqs_euu4Vbo0A";

// class GoogleSuggest extends Component {
//   state = {
//     search: "",
//     value: ""
//   };

//   handleInputChange = e => {
//     this.setState({ search: e.target.value, value: e.target.value });
//   };

//   handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
//     console.log(geocodedPrediction, originalPrediction); // eslint-disable-line
//     this.setState({ search: "", value: geocodedPrediction.formatted_address });
//   };

//   render() {
//     const { search, value } = this.state;
//     return (
//       //   <p>testtttinggg</p>
//       <ReactGoogleMapLoader
//         params={{
//           key: MY_API_KEY,
//           libraries: "places,geocode"
//         }}
//         render={googleMaps =>
//           googleMaps && (
//             <ReactGooglePlacesSuggest
//               googleMaps={googleMaps}
//               autocompletionRequest={{
//                 input: search
//                 // Optional options
//                 // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
//               }}
//               // Optional props
//               onSelectSuggest={this.handleSelectSuggest}
//               textNoResults="My custom no results text" // null or "" if you want to disable the no results item
//               customRender={prediction => (
//                 <div className="customWrapper">
//                   {prediction
//                     ? prediction.description
//                     : "My custom no results text"}
//                 </div>
//               )}
//             >
//               <input
//                 type="text"
//                 value={value}
//                 placeholder="Search a location"
//                 onChange={this.handleInputChange}
//               />
//             </ReactGooglePlacesSuggest>
//           )
//         }
//       />
//     );
//   }
// }

// export default GoogleSuggest;
