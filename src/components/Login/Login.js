import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { loginRequest } from '../../actions/actions';
import LoginForm from './LoginForm';
import FacebookAuth from '../FacebookAuth';

//to prefill form
const testData = process.env.NODE_ENV === 'development' && true; // change to false when testing without data
//to make a mock request to the API that returns success and mock data
const mockRequestSuccess = 'success';

const Login = ({ dispatch, data }) => {
  const prefilledData = {
    username: testData ? 'superiris' : '',
    password: testData ? 'Admin123' : '',
  };

  const submitForm = (values) => {
    dispatch(loginRequest(values), mockRequestSuccess);
  };

  const onFacebookAuthorized = (userData) => {
    dispatch(loginRequest({ fbid: userData.id }, mockRequestSuccess));
  };

  if (data.loggedState) {
    return <Redirect to={{ pathname: '/' }} />;
  } else {
    return (
      <section>
        <h1>Login</h1>
        <LoginForm onSubmit={submitForm} defaultData={prefilledData} />
        <p> or </p>
        <FacebookAuth onAuthorized={onFacebookAuthorized}>Login with Facebook</FacebookAuth>
      </section>
    );
  }
};

function mapStateToProps(state) {
  return {
    data: state,
  };
}

export default connect(mapStateToProps)(Login);
