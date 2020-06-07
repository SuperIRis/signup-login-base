import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({Component, loggedState, ...routeProps})=>{  
  return (
    <Route {...routeProps} render={componentProps => 
      loggedState() ? <Component {...componentProps} /> : <Redirect to='/login' />
    } />
  );
}

export default PrivateRoute;