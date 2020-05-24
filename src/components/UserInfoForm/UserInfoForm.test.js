import UserInfoForm from './UserInfoForm';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

describe('<UserInfoForm />', () => {
it('Renders without crashing and fills default values', () => {
    const ui = mount(<UserInfoForm defaultData={{ username: 'test-user' }} />);
    expect(ui.find('input[name="username"]').props().value).toEqual(
      'test-user'
    );
  });

it('Shows an error message when required fields are missing', async done => {
    const ui = mount(<UserInfoForm />);
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
          .find('.form-error');
      });
      expect(errors.length).toBe(5); //there are 5 required fields [username, fullName, email, country, password]
      done();
    });
  });
});
