import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({Component, data, dispatch, ...routeProps})=>{  
  return (
    <Route {...routeProps} render={componentProps => 
      data.loggedState ? <Component {...componentProps} /> : <Redirect to='/login' />
    } />
  );
}

function mapStateToProps(state) {
  return {
    data: state,
  };
}

export default connect(mapStateToProps)(PrivateRoute);