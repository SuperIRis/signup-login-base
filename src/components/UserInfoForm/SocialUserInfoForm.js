import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import styles from './UserInfoForm.module.css';
import FullField from '../FormElements/FullField';
import DateField from '../FormElements/DateField';
import Label from '../FormElements/Label';
import { SOCIAL_AUTH_FACEBOOK, SOCIAL_AUTH_GOOGLE } from '../../models/constants';
import * as Yup from 'yup';

const userInfoSchema = Yup.object().shape({
  socialMethod: Yup.string()
    .oneOf([SOCIAL_AUTH_FACEBOOK, SOCIAL_AUTH_GOOGLE], 'Social Login invalid')
    .required('Required'),
  socialId: Yup.string().required('Required'),
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

const SocialUserInfoForm = (props) => {
  //creating initialValues object without password and passwordConfirmation

  return (
    <Formik enableReinitialize initialValues={props.values} validationSchema={userInfoSchema} onSubmit={props.onSubmit}>
      {({ errors, touched, values }) => (
        <Form className={styles.infoForm}>
          <Field name='socialMethod' type='hidden' />
          <Field name='socialId' type='hidden' />
          <FullField label='Username' name='username' error={touched.username ? errors.username : null} />
          <FullField
            label='Full name'
            name='fullName'
            error={touched.fullName ? errors.fullName : null}
            value={values.fullName}
          />
          <FullField label='Email' name='email' error={touched.email ? errors.email : null} value={values.email} />
          <Label htmlFor='country'>Country</Label>
          <Field as='select' name='country' id='country'>
            <option value=''>Select</option>
            <option value='Netherlands'>Netherlands</option>
            <option value='Mexico'>Mexico</option>
          </Field>
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

export default SocialUserInfoForm;
