import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import "../node_modules/font-awesome/css/font-awesome.min.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// ReactDOM.render(<App />, document.getElementById("root"));

ReactDOM.render(
  <MuiThemeProvider theme={createMuiTheme()}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
