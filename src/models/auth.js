import {SUCCESS_STATUS} from './constants';
import request from './request';
import errors from './errorDictionary';

// we are saving the token in local storage
let localStorage;
if(global.process && process.env.NODE_ENV){
  //polyfill for testing
  localStorage = require('localStorage');
}
else{
  localStorage = global.window.localStorage;
}

const auth = {
  /**
   * Authorizing by login the user
   * @param {string} username  User's username
   * @param {string} password  User's password
   */
  login({ username, password, fbid, loginAttempts, remember}, mock) {
    const host = `https://${process.env.HOST}:${Number(process.env.PORT)}/`;
    const mockEndpoint =
      mock === 'error' ? host + 'mock/error.json' : host  + 'mock/login.json';
    const realEndpoint = host + '/mock/login.json'; //update with real endpoint once ready
    const endpoint =
      process.env.NODE_ENV === 'development' && mock
        ? mockEndpoint
        : realEndpoint;
    return request.post(endpoint, { username, password, fbid }).then((res) => {
      if (res.status === SUCCESS_STATUS) {
        if (res.result && res.result.token && remember) {
          localStorage.token = res.result.token;
          localStorage.username = res.result.username || '';
        }
        return Promise.resolve({ loginAttempts, ...res });
      } else {
        return Promise.reject({
          raw: res.error,
          message: errors[res.error],
          loginAttempts,
        });
      }
    });
  },

  /**
   * Authorizing by signing up user
   * @param {string} username  User's username
   * @param {string} password  User's password
   * @param {string} email     User's email (only register)
   * @param {string} country   User's country (only register)
   * @param {string} name      User's name (only register)
   */
  signup({ username, password, email, country, fullName }, mock) {
    const mockEndpoint = mock ==='error' ? 'mock/error.json' : 'mock/signup.json';
    const realEndpoint = 'mock/login.json'; //update with real endpoint once ready

    const endpoint =
      process.env.NODE_ENV === 'development' && mock ? mockEndpoint : realEndpoint;
    return request
      .post(endpoint, {
        username,
        password,
        email,
        country,
        fullName,
      })
      .then((res) => {
        if (res.status === SUCCESS_STATUS) {
          return auth.login({username, password}, 'success');
        } else {
          return Promise.reject({
            errorRaw: res.error,
            error: errors[res.error]
          });
        }
      });
  },

  /**
   * Authenticating users that have an active session
   */
  /**
   * @todo "Remember me" functionality, with a token in localStorage
   */
  checkIfUserIsAuthenticated() {
    console.log('check if user auth')
    return request.post('mock/auth.json').then((res) => {
      if (res.status === SUCCESS_STATUS) {
        return Promise.resolve(res);
      } else {
        return Promise.reject(res.error);
      }
    });
  },
};

export default auth;