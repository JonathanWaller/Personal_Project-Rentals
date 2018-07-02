import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Properties from "./components/Properties/Properties";
import Property from "./components/Property/Property";
import AddListing from "./components/AddListing/AddListing";

import { connect } from "react-redux";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/properties" component={Properties} />
    <Route path="/addproperty" component={AddListing} />
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
