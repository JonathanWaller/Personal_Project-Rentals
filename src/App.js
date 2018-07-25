import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Nav from "./components/Nav/Nav";

import routes from "./routes";
import store from "./store";

import "./reset.css";
import "./App.css";

class App extends Component {
  // componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            <Nav />
            {routes}
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
