import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Signup } from './Signup';

describe('Signup', () => {
  it('Redirects already logged users', () => {
    const ui = mount(
      <MemoryRouter initialEntries={['/signup']}>
        <Signup data={{ loggedState: true }} />
      </MemoryRouter>
    );
    expect(ui.find('Router').prop('history').location.pathname).toEqual('/dashboard');
  });
});
