import {SENDING_REQUEST, SET_AUTH, SET_ERROR, CLEAR_ERROR} from '../actions/constants';

const initialState = {
  loggedState: false,
  sending: false
}

function reducer( state = initialState, action){
  switch (action.type) {
    case SENDING_REQUEST:
      return {...state, sending:action.sending}
    case SET_AUTH:
      return {...state, loggedState:action.loggedState}
    case SET_ERROR:
      return {...state, error:action.error};
    case CLEAR_ERROR:
      return {...state, error:{}};
    default:
      return state;
  }
}

export default reducer;