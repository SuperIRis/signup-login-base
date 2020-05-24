import React from 'react';
import styles from './DateField.module.css';
import {Field} from 'formik';

const monthsString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Enum supported styles.
 * @enum {string}
 */
const SUPPORTED_STYLES = {
  //DATEPICKER: "Datepicker",
  //SELECTS: "One select per date element (dd, mm, yyyy)",
  HYBRID: "One select per month, fields for the rest"
};
/**
 * Enum formats.
 * @enum {string}
 */
const FORMATS = {
  DD: 'DD', // day
  MM: 'MM', //Month, in string (e.g. `August`),
  //mm: 'mm' //Month, in number,
  //YY: 'YY' //Year in two digits,
  YYYY: 'YYYY'//Year in four digits
};
/**
 * 
 * @param {object} props
 * @param {string} props.label            Label that will show up on top of the field / field group
 * @param {SUPPORTED_STYLES} props.style  Style of the ui
 * @param {FORMATS} props.format          Format of the date
 */



const getMonthField = (name, format, style)=>{
  if (style === SUPPORTED_STYLES.HYBRID && format.indexOf(FORMATS.MM) != -1) {
    return (
      <Field as='select' name={name + FORMATS.MM} id={name + FORMATS.MM}>
        <option value=''>--- Select ---</option>
        {monthsString.map((month, index) =>
          <option key={`${name}${FORMATS.MM}${index}`} value={index + 1}>{month}</option>
        )}
      </Field>
    );
  }
  return '';
}

const getDayField = (name, format, style, validate)=>{
  if (style === SUPPORTED_STYLES.HYBRID && (format.indexOf(FORMATS.DD) != -1)) {
    return (
      <Field name={name + FORMATS.DD} id={name + FORMATS.DD} validate={validate} />
    );
  }
  return '';
}

const getYearField = (name, format, style)=>{
  if (style === SUPPORTED_STYLES.HYBRID && (format.indexOf(FORMATS.YYYY) != -1)) {
    return (
      <Field name={name + FORMATS.YYYY} id={name + FORMATS.YYYY} />
    );
  }
  return '';
}

const DateField = ({ label, name, errors, format='DDMMYYYY', style=SUPPORTED_STYLES.HYBRID})=>{
  const monthField = getMonthField(name, format, style);
  const dayField = getDayField(name, format, style);
  const yearField = getYearField(name, format, style);
  const { birthDateDD:errorBirthDateDD, birthDateMM: errorBirthDateMM, birthDateYYYY:errorBirthDateYYYY } = errors;
  return(
    <div className={styles.block}>
      <label htmlFor={name} >
        {label}
      </label>
      {monthField}
      {errorBirthDateMM ? <div className='form-error'>{errorBirthDateMM}</div> : null}
      {dayField}
      {errorBirthDateDD ? <div className='form-error'>{errorBirthDateDD}</div> : null}
      {yearField}
      {errorBirthDateYYYY ? <div className='form-error'>{errorBirthDateYYYY}</div> : null}
    </div>
  );
}

export default DateField;