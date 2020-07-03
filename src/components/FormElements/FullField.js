import React from 'react';
import styles from './FullField.module.css';
import errorStyles from './Errors.module.css';
import Label from './Label';
import { Field } from 'formik';

const InputField = ({ name, validate, type, error, label }) => {
  //data-test='form-error' is meant to be used for unit testing error messages
  return (
    <div className={styles.block} data-field={name + '-field'}>
      <Label htmlFor={name}>{label}</Label>
      <div className={error && errorStyles.block}>
        <Field name={name} id={name} validate={validate} type={type || 'text'} />
      </div>
      {error ? (
        <div className={`${errorStyles.message} form-error`} data-test='form-error'>
          {error}
        </div>
      ) : null}
    </div>
  );
};

const Checkbox = ({ name, validate, type, error, label }) => {
  //checkbox is different since it has label in different place and different className
  return (
    <div className={styles.checkboxBlock} data-field={name + '-field'}>
      <Field name={name} id={name} validate={validate} type={type || 'text'} />
      <Label htmlFor={name} className={error && errorStyles.checkbox}>
        {label}
      </Label>
      {error ? <div className={errorStyles.message}>{error}</div> : null}
    </div>
  );
};

const FullField = (props) => {
  const { type } = props;
  if (type === 'checkbox') {
    return <Checkbox {...props} />;
  } else {
    return <InputField {...props} />;
  }
};

export default FullField;
