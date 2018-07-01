import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Properties from "./components/Properties/Properties";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/properties" component={Properties} />
    <Route path="*" render={() => <div>FourOhFour</div>} />
  </Switch>
);
