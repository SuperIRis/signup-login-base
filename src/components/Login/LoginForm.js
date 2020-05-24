import React from 'react';
import { Formik, Form } from 'formik';
import FullField from '../FullField';
import Button from '../ui/Button';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required')
});

const LoginForm = (props)=>{
  const defaults = props.defaultData || {};
  const defaultData = {
    username: defaults.username || '',
    password: defaults.password || ''
  };
  return (
    <Formik
      initialValues = {defaultData}
      validationSchema = {loginSchema}
      onSubmit = {props.onSubmit}
    >
      {
        ({ errors, touched }) => (
          <Form>

            <FullField name='username' label='Username' error={touched.username ? errors.username : null} />
            <FullField name='password' label='Password' type='password' error={touched.password ? errors.password : null} />
            <Button type='submit'>
              Submit
              </Button>

            {props.serverError ? <div>{props.serverError}</div> : null}
          </Form>
      )
      }
    </Formik>
  );
}

export default LoginForm;