import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from '../provider';

const PrivateRoute = ({ children, ...rest }) => {
  const { store } = useContext(Context);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        store.context.isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
