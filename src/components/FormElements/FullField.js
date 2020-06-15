import React from 'react';
import styles from './FullField.module.css';
import Label from './Label';
import { Field } from 'formik';

const FullField = ({ label, name, error, validate, type, value }) => {
  return (
    <div className={styles.block} data-field={name + '-field'}>
      <Label htmlFor={name}>{label}</Label>
      <Field name={name} id={name} validate={validate} type={type || 'text'} />
      {error ? <div className='form-error'>Error: {error}</div> : null}
    </div>
  );
};

export default FullField;
