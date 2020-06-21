import React from 'react';
import { Field } from 'formik';
import styles from './Select.module.css';
import errorStyles from './Errors.module.css';

const Select = ({ children, hideDefault, className, error, ...props }) => {
  const classNames = `${styles.select} ${className}`;
  return (
    <>
      <div className={error && errorStyles.block}>
        <Field as='select' {...props} className={classNames}>
          {!hideDefault && <option value=''>--- Select ---</option>}
          {children}
        </Field>
      </div>
      {error ? <div className={errorStyles.message}>{error}</div> : null}
    </>
  );
};

export default Select;
