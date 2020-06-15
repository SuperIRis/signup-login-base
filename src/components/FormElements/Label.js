import React from 'react';
import styles from './FullField.module.css';

const Label = ({ children, ...labelProps }) => {
  return (
    <label className={styles.label} {...labelProps}>
      {children}
    </label>
  );
};

export default Label;
