import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {signupRequest, loginRequest} from '../../actions/actions';
import UserInfoForm from '../UserInfoForm';
import Button from '../ui/Button';
import Facebook from '../../utils/Facebook';
import errors from '../../models/errorDictionary';
import {SOCIAL_AUTH_FACEBOOK} from '../../models/constants';

const testData = process.env.NODE_ENV === 'development' && true; // change to false when testing without data
const mockRequest = 'error';
const Signup = ({dispatch, data})=>{
  const prefilledData = {
          fullName: testData ? 'Dev Iris' : '',
          email: testData ? 'iris@iris.com': '',
          username: testData ? 'superiris': '',
          country: testData ? 'Mexico': '',
          password: testData ? 'Admin123': '',
          passwordConfirmation: testData ? 'Admin123': '',
          birthDateDD: testData ? '26': '',
          birthDateMM: testData ? '8': '',
          birthDateYYYY: testData ? '1982': '',
          terms: testData ? true: false,
        };
  const [serverError, setServerError] = useState();
  const [facebookLoginBtn, setFacebookLoginBtn] = useState();
  const [formValues, setFormValues] = useState(prefilledData);
  const [signupMethod, setSignupMethod] = useState(); //custom or FB

  const submitForm = values => {
    console.log('submit')
    dispatch(signupRequest(values, mockRequest));
  };

  const authorizeFacebook = () => {
    if(Facebook.status === Facebook.AUTHORIZED){
      //already logged in FB (obtained from facebook init)
      //check if user has already signed up before
      console.log("has user signed up before? since fb has authorized")
      dispatch(loginRequest({ fbid: Facebook.user.id }, 'error')); //second parameter is mock, we want this to fail to be able to test the fb signup without removing the app from our FB account each test
      prefillFields(Facebook.user);
    }
    else{
      console.log("we want to authorize fb, it has not been auth before")
      Facebook.login()
        .then((res) => {
                         console.log(
                           res,
                           "logged!! let's check with server BUT CHANGE HARDCODED ID"
                         );
                         dispatch(loginRequest({ fbid: res.id }, 'error')); //second parameter is mock, we want this to fail to be able to test the fb signup without removing the app from our FB account each test
                         prefillFields(res);
                         //TODO: now we need to figure out if login was not successful, in which case we prefill the form with data
                         //
                       })
        .catch((res) => {
          //user didn't authorize FB login window, do nothing, they can try again or use email
          console.log("error on login", res)
        });
    }
    
  };

  const prefillFields = (user)=>{
    setSignupMethod(SOCIAL_AUTH_FACEBOOK);
    setFormValues({
      ...formValues,
      fullName: user.name,
      email: user.email,
      socialMethod: SOCIAL_AUTH_FACEBOOK,
      socialId: user.id
    });
  };

  useEffect(()=>{
    //initialize facebook when component is rendered
    Facebook.init().then(()=>{
      //enable fb button
      setFacebookLoginBtn(
        <Button onClick={authorizeFacebook}>Facebook Yo!</Button>
      );
    });
  }, []);

  if(!data.loggedState){
    return (
      <section>
        <h1>Signup</h1>
        <h2>Register with Facebook</h2>
        {facebookLoginBtn}
        <h2>Register with your email</h2>
        <UserInfoForm
          onSubmit={submitForm}
          serverError={serverError}
          values={formValues}
          signupMethod={signupMethod}
        />
        {// User unknown is not an error here, since we are not logging in
        data.error &&
        data.error.raw &&
        errors[data.error.raw] !== errors.USER_UNKNOWN ? (
          <div>{data.error.message}</div>
        ) : null}
      </section>
    );
  }
  else{
    console.log("we are not redirecting now")
    //return <div>Go to login man</div>
    return <Redirect to={{ pathname: '/' }} />;
  }
}

function mapStateToProps(state) {
  return {
    data: state
  };
}

//connecting component to the store (https://react-redux.js.org/introduction/basic-tutorial)
export default connect(mapStateToProps)(Signup);