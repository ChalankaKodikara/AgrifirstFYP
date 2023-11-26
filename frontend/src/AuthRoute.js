// AuthRoute.js
import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const AuthRoute = ({ component: Component, ...rest }) => {
  const authToken = Cookies.get("authToken");

  return (
    <Route
      {...rest}
      render={(props) =>
        authToken ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default AuthRoute;