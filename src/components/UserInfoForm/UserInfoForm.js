import React from 'react';
import {SOCIAL_AUTH_FACEBOOK, SOCIAL_AUTH_GOOGLE} from '../../models/constants';
import CustomUserInfoForm from './CustomUserInfoForm';
import SocialUserInfoForm from './SocialUserInfoForm';

const UserInfoForm = (props) => {
  //Creating social user form for users who signup with social login, custom for the rest
  if (
    props.signupMethod === SOCIAL_AUTH_FACEBOOK ||
    props.signupMethod === SOCIAL_AUTH_GOOGLE
  ) {
    return <SocialUserInfoForm {...props} />;
  } else {
    return <CustomUserInfoForm {...props} />;
  }
  
};

export default UserInfoForm;