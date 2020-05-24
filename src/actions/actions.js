import {
  SIGNUP_REQUEST,
  SENDING_REQUEST,
  SET_AUTH,
  LOGIN_REQUEST,
  SESSION_REQUEST,
  SET_ERROR,
  CLEAR_ERROR
} from './constants';


/**
 * Sets the `currentlySending` state, which displays loading indicator during requests
 * @param {boolean} sending       if true, a request is being sent
 */
export function sendingRequest(sending){
  return {type:SENDING_REQUEST, sending};
}

/**
 * Sets authentication state
 * @param {boolean} loggedUser   true if user is logged in 
 */
export function setAuthState(loggedUser) {
  console.log("\n:::::::::::::::::SET AUTH STATE?? \n")
  return {type:SET_AUTH, loggedUser};
}

/**  
* We want to signup a user
* @param {object} data            data used for signing up the user
* @param {string} data.name       user's name
* @param {string} data.username   user's username
* @param {string} data.password   user's password
* @param {string} data.email      user's email
* @param {string} data.country    user's country
*/
export function signupRequest(data, mock){
  return {type:SIGNUP_REQUEST, data, mock};
}

/**
 * We want to login a user
 * @param {object} data           data used for login the user
 * @param {string} data.username  user's username
 * @param {string} data.password  user's password
 * @param {string} data.fbid      user's facebook id
 */

 export function loginRequest(data, mock){
   return {type:LOGIN_REQUEST, data, mock}
 }

 /**
  * We want to figure out if a user has an active session in server
  */

  export function sessionRequest(){
    return {type:SESSION_REQUEST};
  }

  /**
   * Sets the error state to the error received
   * @param {object}  error         the error received
   * @param {string}  error.error   the error message
   */
  export function setError(error){
    return {type:SET_ERROR, error}
  }

  /**
   * Clears the error state
   */
  export function clearError(error){
    return {type:CLEAR_ERROR};
  }