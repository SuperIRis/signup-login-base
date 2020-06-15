import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import styles from './UserInfoForm.module.css';
import FullField from '../FormElements/FullField';
import DateField from '../FormElements/DateField';
import Label from '../FormElements/Label';
import Select from '../FormElements/Select';
import * as Yup from 'yup';

const userInfoSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  username: Yup.string()
    .min(4, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too short!')
    .max(25, 'Too long!')
    .matches(
      //forcing a special character too for stronger passwords -->(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Password must contain at least an uppercase letter, a lowercase letter, and a numeric character'
    )
    .required('Required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords are not the same!')
    .required('Required'),
  country: Yup.string().required('Required'),
  birthDateDD: Yup.number()
    .typeError('Please input a valid birth day')
    .min(1, 'Please input a valid birth day')
    .max(31, 'Please input a valid birth day')
    .integer('Please input a valid birth day'),
  birthDateYYYY: Yup.number()
    .typeError('Please input a valid birth year')
    .min(1920, 'Please input a valid birth year')
    .max(2002, 'Please input a valid birth year')
    .integer('Please input a valid birth year'),
  terms: Yup.boolean().oneOf([true], 'Accept Terms & Conditions is required'),
});

const CustomUserInfoForm = (props) => {
  //creating initialValues object without password and passwordConfirmation

  return (
    <Formik enableReinitialize initialValues={props.values} validationSchema={userInfoSchema} onSubmit={props.onSubmit}>
      {({ errors, touched, values }) => (
        <Form className={styles.infoForm}>
          <FullField label='Username*' name='username' error={touched.username ? errors.username : null} />
          <FullField
            label='Password*'
            name='password'
            type='password'
            error={touched.password ? errors.password : null}
          />
          <FullField
            label='Repeat Password*'
            name='passwordConfirmation'
            type='password'
            error={touched.passwordConfirmation ? errors.passwordConfirmation : null}
          />
          <FullField
            label='Full name*'
            name='fullName'
            error={touched.fullName ? errors.fullName : null}
            value={values.fullName}
          />
          <FullField label='Email*' name='email' error={touched.email ? errors.email : null} value={values.email} />
          <Label htmlFor='country'>Country*</Label>
          <Select name='country' id='country'>
            <option value='Netherlands'>Netherlands</option>
            <option value='Mexico'>Mexico</option>
          </Select>
          {errors.country && touched.country ? <div>{errors.country}</div> : null}
          <DateField label='Birth date' name='birthDate' errors={errors} />
          <FullField
            label='I accept terms and conditions'
            type='checkbox'
            name='terms'
            checked={values.terms}
            error={touched.terms ? errors.terms : null}
          />
          <button type='submit' className={styles.submitBtn}>
            Submit
          </button>
          {props.serverError ? <div>{props.serverError}</div> : null}
        </Form>
      )}
    </Formik>
  );
};

export default CustomUserInfoForm;
