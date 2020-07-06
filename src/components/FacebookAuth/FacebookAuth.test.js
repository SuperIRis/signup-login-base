import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import FacebookAuth from './FacebookAuth';
import Facebook from './Facebook';

const FacebookBackup = Object.assign({}, Facebook);
afterEach(() => {
  jest.clearAllMocks();
});
describe('FacebookAuth', () => {
  it('Skips initiating FB if already initiated', () => {
    //const spyInit = jest.spyOn(Facebook, 'init').mockImplementation(() => Promise.resolve());
    Facebook.init = jest.fn(() => Promise.resolve());
    Facebook.status = Facebook.AUTHORIZED;
    const ui = mount(<FacebookAuth />);
    expect(Facebook.init).not.toHaveBeenCalled();
  });
  it('Enables button after Facebook init', async () => {
    Facebook.status = 'uninitialized';
    const ui = mount(<FacebookAuth />);
    expect(ui.find('Button').props().loading).toEqual(true);
    expect(Facebook.init).toHaveBeenCalled();
    await act(() => Promise.resolve());
    setTimeout(() => {
      expect(ui.find('Button').props().loading).toEqual(false);
    });
  });
});

describe('Facebook', () => {
  //Object.assign(Facebook, FacebookBackup);

  global.FB = {
    init: jest.fn(),
    getLoginStatus: jest.fn((callback) => {
      callback({ status: Facebook.AUTHORIZED });
    }),
    api: jest.fn((api, callback) => {
      callback({ status: Facebook.AUTHORIZED });
    }),
    login: jest.fn((callback) => {
      callback({ status: Facebook.AUTHORIZED });
    }),
  };

  it('FB.init and FB.getLoginStatus are called together', () => {
    Facebook.init = FacebookBackup.init;
    Facebook.loadSDK = jest.fn();
    Facebook.init();
    window.fbAsyncInit();
    expect(FB.init).toHaveBeenCalled();
    expect(FB.getLoginStatus).toHaveBeenCalled();
  });
  it('Login gets user info if authorized', () => {
    Facebook.login();
    expect(FB.api).toHaveBeenCalled();
  });
});
