import React from 'react';
import { connect } from 'react-redux';
import {loginRequest} from '../../actions/actions';
import LoginForm from './LoginForm';

const testMode = true;
const Login = ({dispatch, data})=>{
  const defaultData = process.env.NODE_ENV === 'development' && testMode ? {
    username: 'superiris',
    password: 'Admin123'
  } : {};

  const submitForm = values => {
    dispatch(loginRequest(values));
  };
  if (data.loggedState) {
    return <div>Already logged!</div>
  }
  else{
      return (
        <div>
          <h1>Login</h1>
          <LoginForm onSubmit={submitForm} defaultData={defaultData} />
        </div>
      );
  }
}

function mapStateToProps(state){
  return {
    data:state
  }
}

export default connect(mapStateToProps)(Login);