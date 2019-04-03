import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ user, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={props => {
        return rest.restricted ? (
          user ? (
            <Redirect to="/admin" />
          ) : (
            <Component {...props} user={user} />
          )
        ) : (
          <Component {...props} user={user} />
        );
      }}
    />
  );
};

export default PublicRoute;
