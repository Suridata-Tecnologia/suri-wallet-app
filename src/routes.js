import React from "react";
import { Routes as Switch, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";

const Routes = props => (
  <BrowserRouter>
    <Switch>
        <Route path="/" element={<Login stage="1" />}></Route>
        <Route path="/choose-channel" element={<Login stage="2" />}></Route>
        <Route path="/confirm-account" element={<Login stage="3" />}></Route>
        <Route path="/login" element={<Login stage="4" />}></Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
