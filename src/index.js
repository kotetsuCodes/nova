import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import routes from "./routes";

import "./index.css";
import "./bootstrap/dist/css/bootstrap-grid.css";
import "./fa/css/font-awesome.min.css";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>{routes}</Provider>,
  document.getElementById("root")
);
