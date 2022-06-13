import React from "react";
import { Route, BrowserRouter, Navigate, Routes as Switch, Outlet } from "react-router-dom";
import { isAutheticate } from "./services/auth";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const PrivateRoute = () => {
  return isAutheticate() ? <Outlet /> : <Navigate to="/" />;
};

const Routes = props => (
  <BrowserRouter>
    <Switch>
        <Route path="/" element={<Login stage="1" />}></Route>
        <Route path="/choose-channel" element={<Login stage="2" />}></Route>
        <Route path="/confirm-account" element={<Login stage="3" />}></Route>
        <Route path="/login" element={<Login stage="4" />}></Route>
        <Route element={<PrivateRoute />}>
          <Route element={<Home />} path="/home" />
          <Route element={<Dashboard />} path="/dashboard" />
        </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
