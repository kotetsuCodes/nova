import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Main from "./components/main/Main";

export default (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </div>
  </Router>
);
