import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Login } from './Login';
import LoginForm from './LoginForm';

describe('Login', () => {
  it('Redirects already logged users', () => {
    const ui = mount(
      <MemoryRouter initialEntries={['/login']}>
        <Login data={{ loggedState: true }} />
      </MemoryRouter>
    );
    expect(ui.find('Router').prop('history').location.pathname).toEqual('/dashboard');
  });

  it('Calls onSubmit when submitted', async (done) => {
    const mockGetElementsByTagName = jest.fn(() => [{ parentNode: { insertBefore: () => {} } }]);
    global.document = {};
    Object.defineProperty(global.document, 'getElementsByTagName', { value: mockGetElementsByTagName });
    const prefilledData = {
      username: 'superiris',
      password: 'Admin123',
    };
    //this is for Facebook SDK loading that uses document.parentNode.insertBefore
    const mockSubmit = jest.fn();
    const ui = mount(<LoginForm onSubmit={mockSubmit} data={{ loggedState: false }} defaultData={prefilledData} />);
    const form = ui.find('form');

    await act(async () => {
      //had to add this since this uses the useEventCallback
      // so we need to wait on the promise (https://github.com/jaredpalmer/formik/issues/1543)
      form.simulate('submit', { preventDefault() {} });
    });
    setTimeout(() => {
      expect(mockSubmit.mock.calls.length).toBe(1);
      done();
    }, 1000);
  });
});
