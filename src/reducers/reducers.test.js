import { SENDING_REQUEST, SET_AUTH, SET_ERROR, CLEAR_ERROR } from '../actions/constants';
import reducer from './reducers';

describe('Reducer', () => {
  const initialState = {
    loggedState: false,
    sending: false,
  };
  it('Should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('Should handle SENDING_REQUEST', () => {
    expect(reducer({}, { type: SENDING_REQUEST, sending: true })).toEqual({ sending: true });
  });
  it('Should handle SET_AUTH', () => {
    expect(reducer({}, { type: SET_AUTH, loggedState: true })).toEqual({ loggedState: true });
  });
  it('Should handle SET_ERROR', () => {
    expect(reducer({}, { type: SET_ERROR, error: true })).toEqual({ error: true });
  });
  it('Should handle CLEAR_ERROR', () => {
    expect(reducer({}, { type: SET_ERROR, error: false })).toEqual({ error: false });
  });
});
