import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Properties from "./components/Properties/Properties";
import Property from "./components/Property/Property";
import AddListing from "./components/AddListing/AddListing";
import Review from "./components/Review/Review";
import Favorites from "./components/Favorites/Favorites";
import About from "./components/About/About";
import CircularProgress from "@material-ui/core/CircularProgress";
import EditListing from "./components/EditListing/EditListing";

import { connect } from "react-redux";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/properties" component={Properties} />
    <Route path="/addproperty" component={AddListing} />
    <Route
      exact
      path="/addreview/:id"
      component={connect(state => state)(props => {
        if (props.properties.properties.length) {
          return (
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

    <Route
      path="/editproperty/:id"
      component={connect(state => state)(props => {
        if (props.properties.properties.length) {
          return (
            <EditListing
              property={props.properties.properties.find(
                p => p.id === +props.match.params.id
              )}
              {...props}
            />
          );
        } else {
          return <CircularProgress />;
        }
      })}
    />

    <Route
      path="/property/:id"
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
          return (
            <div className="load_circle">
              <CircularProgress />
            </div>
          );
        }
      })}
    />
    <Route path="/favorites/:id" component={Favorites} />
    <Route path="/about" component={About} />
    <Route path="*" render={() => <div>FourOhFour</div>} />
  </Switch>
);
