import { SIGNUP_REQUEST, LOGIN_REQUEST } from '../actions/constants';
import { setAuthState, sendingRequest, setError } from '../actions/actions';
import sagasRoot, { loginFlow, signupFlow, authorize } from './sagas';
import { take, call, put, fork } from 'redux-saga/effects';
import auth from '../models/auth';
describe('Sagas', () => {
  const user = { username: 'superiris', password: 'Admin123' };
  const data = { ...user, loginAttempts: 1 };
  const putLogged = { ...put(setAuthState(true)) };
  const sendRequestTrue = { ...put(sendingRequest(true)) };
  const sendRequestFalse = { ...put(sendingRequest(false)) };
  const sendError = { ...put(setError(new Error('authType required'))) };
  it('Succesfully go through loginFlow ', () => {
    const gen = loginFlow();
    expect(gen.next().value).toEqual(take('LOGIN_REQUEST'));
    expect(gen.next({ data }).value).toEqual({ ...call(authorize, data, LOGIN_REQUEST, undefined) });
    expect(gen.next(true).value).toEqual(putLogged);
  });
  it('Succesfully go through signupFlow ', () => {
    const gen = signupFlow();
    expect(gen.next().value).toEqual(take('SIGNUP_REQUEST'));
    expect(gen.next({ data: { ...user } }).value).toEqual({
      ...call(authorize, { ...user }, SIGNUP_REQUEST, undefined),
    });
    expect(gen.next(true).value).toEqual(putLogged);
  });
  it('Sends LOGIN_REQUEST in authorize for logins ', () => {
    const gen = authorize({}, LOGIN_REQUEST);
    expect(gen.next().value).toEqual(sendRequestTrue);
    expect(gen.next().value).toEqual({ ...call(auth.login, {}, undefined) });
    expect(gen.next().value).toEqual(sendRequestFalse);
  });
  it('Sends SIGNUP_REQUEST in authorize for signups ', () => {
    const gen = authorize({}, SIGNUP_REQUEST);
    expect(gen.next().value).toEqual(sendRequestTrue);
    expect(gen.next().value).toEqual({ ...call(auth.signup, {}, undefined) });
    expect(gen.next().value).toEqual(sendRequestFalse);
  });
  it('Throws an error when user is not authorized ', () => {
    const mockFn = jest.fn(() => {
      throw 'Error';
    });
    const gen = authorize();
    expect(gen.next().value).toEqual(sendRequestTrue);
    expect(gen.next().value).toEqual(sendError);
    expect(gen.next().value).toEqual(sendRequestFalse);
  });
  it('Root listens to signup and login', () => {
    const gen = sagasRoot();
    expect(gen.next().value).toEqual(fork(signupFlow));
    expect(gen.next().value).toEqual(fork(loginFlow));
  });
});
