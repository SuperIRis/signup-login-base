import React, { useState, useEffect } from 'react';
import Facebook from './Facebook';
import Button from '../ui/Button';

const FacebookAuth = ({ onAuthorized, children }) => {
  const [enabled, setEnabled] = useState();
  const buttonLabel = children || 'Facebook Yo!';
  const authorizeFacebook = () => {
    if (Facebook.status === Facebook.AUTHORIZED) {
      //already logged in FB (obtained from facebook init)
      //check if user has already signed up before
      onAuthorized(Facebook.user);
    } else {
      Facebook.login()
        .then((res) => {
          onAuthorized(res);
        })
        .catch((err) => {
          //user didn't authorize FB login window, do nothing, they can try again or use email
        });
    }
  };

  useEffect(() => {
    //initialize facebook when component is rendered
    if (Facebook.status === Facebook.UNINITIALIZED) {
      Facebook.init().then(() => {
        //enable fb button
        setEnabled(true);
      });
    } else if (Facebook.status === Facebook.AUTHORIZED) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, []);

  if (enabled) {
    return <Button onClick={authorizeFacebook}>{buttonLabel}</Button>;
  } else {
    return <Button loading={true}>{buttonLabel}</Button>;
  }
};

export default FacebookAuth;
