import React from 'react';
import { mount } from 'enzyme';
import { PrivateRoute } from './PrivateRoute';
import { GuestRoute } from './GuestRoute';
import { MemoryRouter } from 'react-router-dom';
import Button from '../components/ui/Button';

describe('Private routes', () => {
  it('PrivateRoute redirects to login when user is not logged and route is not provided', () => {
    const ui = mount(
      <MemoryRouter initialEntries={['/']}>
        <PrivateRoute exact path='/' data={{ loggedState: false }} />
      </MemoryRouter>
    );
    expect(ui.find('Router').prop('history').location.pathname).toEqual('/login');
  });
  it('PrivateRoute redirects to provided route when user is not logged', () => {
    const ui = mount(
      <MemoryRouter initialEntries={['/']}>
        <PrivateRoute exact path='/' data={{ loggedState: false }} redirectTo={'/home'} />
      </MemoryRouter>
    );
    expect(ui.find('Router').prop('history').location.pathname).toEqual('/home');
  });
  it('PrivateRoute renders provided component when user is logged', () => {
    const ui = mount(
      <MemoryRouter initialEntries={['/']}>
        <PrivateRoute exact path='/' data={{ loggedState: true }} component={Button} />
      </MemoryRouter>
    );
    expect(ui.find('Button').length).toEqual(1);
  });
});

describe('Guest routes', () => {
  it('GuestRoute redirects to dashboard when user is logged and route is not provided', () => {
    const ui = mount(
      <MemoryRouter initialEntries={['/']}>
        <GuestRoute exact path='/' data={{ loggedState: true }} />
      </MemoryRouter>
    );
    expect(ui.find('Router').prop('history').location.pathname).toEqual('/dashboard');
  });

  it('GuestRoute redirects to provided route when user is logged', () => {
    const ui = mount(
      <MemoryRouter initialEntries={['/']}>
        <GuestRoute exact path='/' data={{ loggedState: true }} redirectTo={'/home'} />
      </MemoryRouter>
    );
    expect(ui.find('Router').prop('history').location.pathname).toEqual('/home');
  });

  it('GuestRoute renders provided component when user is not logged', () => {
    const ui = mount(
      <MemoryRouter initialEntries={['/']}>
        <GuestRoute exact path='/' data={{ loggedState: false }} component={Button} />
      </MemoryRouter>
    );
    expect(ui.find('Button').length).toEqual(1);
  });
});
