import React from "react";
import { Route, BrowserRouter, Navigate, Routes as Switch, Outlet } from "react-router-dom";
import { isAutheticate, isAdmin } from "./services/auth";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Beneficiaries from "./pages/Beneficiaries";
import Contestations from "./pages/Contestations";


const PrivateRoute = () => {
  return isAutheticate() ? <Outlet /> : <Navigate to="/" />;
};

const IsAdmin = () => {
  const permissions = isAdmin();
  return permissions.includes("corretor") ? <Outlet /> : <Navigate to="/home" />;
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
          <Route element={<Profile />} path="/profile" />
          <Route element={<IsAdmin />}>
            <Route element={<Beneficiaries />} path="/beneficiaries" />
            <Route element={<Contestations />} path="/contestations" />            
          </Route>          
          <Route element={<Dashboard />} path="/dashboard/:user_id" />
          <Route element={<Contestations />} path="/contestations/:user_id" />
        </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
