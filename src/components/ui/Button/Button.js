import React from 'react';
import styles from './Button.module.css'; //need to import even if not using classes, to apply default styles

const Button = ({classNames = [], children, type, onClick, loading})=>{
  let disabled = false;
  if(loading){
    classNames.indexOf(styles.loading) === -1 && classNames.push(styles.loading);
    disabled = true;
  }
  return (
    <button
      className={classNames.join(' ')+' '+styles.button}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;