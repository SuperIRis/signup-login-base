import { SIGNUP_REQUEST, LOGIN_REQUEST } from '../actions/constants';
import { loginFlow, signupFlow, sessionFlow, authorize, getSession } from './sagas';
import { take, call } from 'redux-saga/effects';
describe('Sagas', () => {
  const user = { username: 'superiris', password: 'Admin123' };
  const data = { ...user, loginAttempts: 1 };
  const takeObjectLogin = { ...call(authorize, data, LOGIN_REQUEST, undefined) };
  const takeObjectSignup = { ...call(authorize, { ...user }, SIGNUP_REQUEST, undefined) };
  const takeObjectSession = { ...call(getSession, undefined) };
  it('Succesfully go through loginFlow ', () => {
    const gen = loginFlow();
    expect(gen.next().value).toEqual(take('LOGIN_REQUEST'));
    expect(gen.next({ data }).value).toEqual(takeObjectLogin);
  });
  it('Succesfully go through signupFlow ', () => {
    const gen = signupFlow();
    expect(gen.next().value).toEqual(take('SIGNUP_REQUEST'));
    expect(gen.next({ data: { ...user } }).value).toEqual(takeObjectSignup);
  });
  it('Succesfully go through sessionFlow ', () => {
    const gen = sessionFlow();
    expect(gen.next().value).toEqual(take('SESSION_REQUEST'));
    expect(gen.next({ data: { ...user } }).value).toEqual(takeObjectSession);
  });
});
