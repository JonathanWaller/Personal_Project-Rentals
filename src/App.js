import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ScrollToTop from "react-router-scroll-top";

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
          <ScrollToTop>
            <div className="App">
              <Nav />
              {routes}
            </div>
          </ScrollToTop>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
