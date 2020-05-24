import React from 'react';
import styles from './Button.module.css'; //need to import even if not using classes, to apply default styles

const Button = ({classNames = [], children, type, onClick})=>{

  return (
    <button className={classNames.join(' ')} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;