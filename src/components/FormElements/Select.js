import React from 'react';
import { Field } from 'formik';
import styles from './Select.module.css';

const Select = ({ children, hideDefault, className, ...props }) => {
  const classNames = `${styles.select} ${className}`;
  return (
    <Field as='select' {...props} className={classNames}>
      {!hideDefault && <option value=''>--- Select ---</option>}
      {children}
    </Field>
  );
};

export default Select;
