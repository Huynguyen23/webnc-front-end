/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
// follow https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './Context';


const checkAuth = () => {
  const token = localStorage.getItem('tokens').accessToken;
  const refreshToken = localStorage.getItem('tokens').refreshToken;
  if (!token || !refreshToken) {
    return false;
  }

  try {
    // { exp: 12903819203 }
    const { exp } = refreshToken;
    console.log("", exp)
    if (exp < new Date().getTime() / 1000) {
      return false;
    }

  } catch (e) {
    return false;
  }

  return true;
}


export const PrivateRoute = ({ component: Component, render, ...rest }) => {
  const { authTokens } = useAuth();

  return (
    <Route
      {...rest}
      render={props => {
        return authTokens ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};
