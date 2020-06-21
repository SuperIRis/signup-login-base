import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupRequest, loginRequest } from '../../actions/actions';
import UserInfoForm from '../UserInfoForm';
import FacebookAuth from '../FacebookAuth';
import errors from '../../models/errorDictionary';
import { SOCIAL_AUTH_FACEBOOK } from '../../models/constants';

//three dev modes:
//to prefill form
const testData = process.env.NODE_ENV === 'development' && false; // change to false when testing without data
//to make a mock request to the API that returns an error
const mockRequestError = 'error';
//to make a mock request to the API that returns success and mock data
const mockRequestSuccess = 'success';

const Signup = ({ dispatch, data }) => {
  const prefilledData = {
    fullName: testData ? 'Dev Iris' : '',
    email: testData ? 'iris@iris.com' : '',
    username: testData ? 'superiris' : '',
    country: testData ? 'Mexico' : '',
    password: testData ? 'Admin123' : '',
    passwordConfirmation: testData ? 'Admin123' : '',
    birthDateDD: testData ? '26' : '',
    birthDateMM: testData ? '8' : '',
    birthDateYYYY: testData ? '1982' : '',
    terms: testData ? true : false,
  };
  let serverError;

  const [formValues, setFormValues] = useState(prefilledData);
  const [signupMethod, setSignupMethod] = useState(); //custom or FB

  const submitForm = (values) => {
    dispatch(signupRequest(values, mockRequestSuccess));
  };

  const onFacebookAuthorized = (userData) => {
    dispatch(loginRequest({ fbid: userData.id }, mockRequestError)); //second parameter can be mock, we want this to fail to be able to test the fb signup without removing the app from our FB account each test
    prefillFields(userData);
  };

  const prefillFields = (user) => {
    setFormValues({
      ...formValues,
      fullName: user.name,
      email: user.email,
      socialMethod: SOCIAL_AUTH_FACEBOOK,
      socialId: user.id,
    });
    setSignupMethod(SOCIAL_AUTH_FACEBOOK);
  };

  //check if server error. USER_UNKNOWN is not an error for signup, it just means the user hasn't registered before
  if (data.error && data.error.raw && errors[data.error.raw] !== errors.USER_UNKNOWN && !mockRequestError) {
    serverError = data.error.message;
  }
  if (!data.loggedState) {
    return (
      <section>
        <h1>Signup</h1>
        <h2>Register with Facebook</h2>
        <FacebookAuth onAuthorized={onFacebookAuthorized} />
        <h2>Register with your email</h2>
        <UserInfoForm
          onSubmit={submitForm}
          serverError={serverError}
          values={formValues}
          signupMethod={signupMethod}
          serverError={serverError}
        />
      </section>
    );
  } else {
    return <Redirect to={{ pathname: '/' }} />;
  }
};

function mapStateToProps(state) {
  return {
    data: state,
  };
}

//connecting component to the store (https://react-redux.js.org/introduction/basic-tutorial)
export default connect(mapStateToProps)(Signup);
