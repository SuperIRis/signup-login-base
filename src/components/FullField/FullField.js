import React from 'react';
import styles from './FullField.module.css';
import {Field} from 'formik';

const FullField = ({ label, name, error, validate, type, value }) => {
  return (
    <div className={styles.block} data-field={name+"-field"}>
      <label htmlFor={name} >
        {label}
      </label>
      <Field name={name} id={name} validate={validate} type={type} />
      {error ? <div className='form-error'>Error: {error}</div> : null}
    </div>
  );
}

export default FullField;