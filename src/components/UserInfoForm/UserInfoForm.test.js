import UserInfoForm from './UserInfoForm';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';
import { SOCIAL_AUTH_FACEBOOK } from '../../models/constants';

describe('<UserInfoForm />', () => {
  const prefilledData = {
    fullName: 'Dev Iris',
    email: 'iris@iris.com',
    username: 'superiris',
    country: 'Mexico',
    password: 'Admin123',
    passwordConfirmation: 'Admin123',
    birthDateDD: '26',
    birthDateMM: '8',
    birthDateYYYY: '1982',
    terms: true,
  };
  const emptyData = {
    fullName: '',
    email: '',
    username: '',
    country: '',
    password: '',
    passwordConfirmation: '',
    birthDateDD: '',
    birthDateMM: '',
    birthDateYYYY: '',
    terms: false,
  };
  it('Renders social form when Facebook selected', () => {
    const ui = shallow(<UserInfoForm signupMethod={SOCIAL_AUTH_FACEBOOK} />);
    expect(ui.find('SocialUserInfoForm').exists()).toEqual(true);
  });

  it('Renders custom form when no Facebook selected', () => {
    const ui = shallow(<UserInfoForm signupMethod={'other'} />);
    expect(ui.find('CustomUserInfoForm').exists()).toEqual(true);
  });

  it('Fills default values', () => {
    const ui = mount(<UserInfoForm values={prefilledData} />);
    expect(ui.find('input[name="username"]').props().value).toEqual('superiris');
  });

  it('Shows an error message when required fields are missing', async (done) => {
    const ui = mount(<UserInfoForm values={emptyData} onSubmit={jest.fn()} />);
    const form = ui.find('form');
    await act(async () => {
      //had to add this since this uses the useEventCallback
      // so we need to wait on the promise (https://github.com/jaredpalmer/formik/issues/1543)
      form.simulate('submit');
    });
    setTimeout(() => {
      let errors;
      act(() => {
        errors = ui
          .find('Formik')
          .update()
          .find('[data-test="form-error"]');
      });

      expect(errors.length).toBe(5); //there are 5 required fields [username, fullName, email, country, password]
      done();
    });
  });
});
