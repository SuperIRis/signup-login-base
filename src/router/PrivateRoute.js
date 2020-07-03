import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export const PrivateRoute = ({ component, redirectTo, data, dispatch, ...routeProps }) => {
  const Component = component;
  const defaultRoute = '/login';
  return (
    <Route
      {...routeProps}
      render={(componentProps) =>
        data.loggedState ? <Component {...componentProps} /> : <Redirect to={redirectTo || defaultRoute} />
      }
    />
  );
};

function mapStateToProps(state) {
  return {
    data: state,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
