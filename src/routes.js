import React from "react";
import { Routes as Switch, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";

const Routes = props => (
  <BrowserRouter>
    <Switch>
        <Route path="/" element={<Login />}></Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
