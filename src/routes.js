import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Properties from "./components/Properties/Properties";
import Property from "./components/Property/Property";
import AddListing from "./components/AddListing/AddListing";
import Review from "./components/Review/Review";
// import EditListing from "./components/EditListing/EditListing";

import { connect } from "react-redux";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/properties" component={Properties} />
    <Route path="/addproperty" component={AddListing} />
    {/* <Route path="/addreview/:id" component={Review} /> */}
    <Route
      exact
      path="/addreview/:id"
      component={connect(state => state)(props => {
        //
        if (props.properties.properties.length) {
          return (
            // <Review
            //   reviewProperty={props.property.property.find(
            //     p => p.id === +props.match.params.id
            //   )}
            //   {...props}
            // />
            <Review
              property={props.properties.properties.find(
                p => p.id === +props.match.params.id
              )}
              {...props}
            />
          );
        } else {
          return "Loading";
        }
      })}
    />
    {/* <Route path="/editproperty" component={EditListing} /> */}
    <Route
      exact
      path="/property/:id"
      // component={Property}
      component={connect(state => state)(props => {
        if (props.properties.properties.length) {
          return (
            <Property
              property={props.properties.properties.find(
                p => p.id === +props.match.params.id
              )}
              review={props.reviews.reviews.filter(
                r => r.post_id === +props.match.params.id
              )}
              {...props}
            />
          );
        } else {
          return "Loading";
        }
      })}
    />

    <Route path="*" render={() => <div>FourOhFour</div>} />
  </Switch>
);
