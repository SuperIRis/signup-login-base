import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//for routes ONLY available for guest users (not authenticated users) like HomeGuest or Register
const GuestRoute = ({ Component, redirectTo, data, dispatch, ...routeProps }) => {
  const defaultRoute = '/dashboard';
  return (
    <Route
      {...routeProps}
      render={(componentProps) =>
        !data.loggedState ? <Component {...componentProps} /> : <Redirect to={redirectTo || defaultRoute} />
      }
    />
  );
};

function mapStateToProps(state) {
  return {
    data: state,
  };
}

export default connect(mapStateToProps)(GuestRoute);
