import React from 'react';
import { Field } from 'formik';
import Select from './Select';
import Label from './Label';
import styles from './DateField.module.css';
import errorStyles from './Errors.module.css';

const monthsString = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Enum supported styles.
 * @enum {string}
 */
const SUPPORTED_STYLES = {
  //DATEPICKER: "Datepicker",
  //SELECTS: "One select per date element (dd, mm, yyyy)",
  HYBRID: 'One select per month, fields for the rest',
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
  YYYY: 'YYYY', //Year in four digits
};
/**
 *
 * @param {object} props
 * @param {string} props.label            Label that will show up on top of the field / field group
 * @param {SUPPORTED_STYLES} props.style  Style of the ui
 * @param {FORMATS} props.format          Format of the date
 */

const getMonthField = (name, format, style, error) => {
  if (style === SUPPORTED_STYLES.HYBRID && format.indexOf(FORMATS.MM) != -1) {
    return (
      <div key={name + FORMATS.MM} className={styles.monthBlock}>
        <label className={styles.subLabel}>Month</label>
        <Select name={name + FORMATS.MM} id={name + FORMATS.MM} hideDefault={true} error={error}>
          <option value=''>--- Select month ---</option>
          {monthsString.map((month, index) => (
            <option key={`${name}${FORMATS.MM}${index}`} value={index + 1}>
              {month}
            </option>
          ))}
        </Select>
      </div>
    );
  }
  return '';
};

const getDayField = (name, format, style, error) => {
  if (style === SUPPORTED_STYLES.HYBRID && format.indexOf(FORMATS.DD) != -1) {
    return (
      <div key={name + FORMATS.DD} className={styles.dayBlock}>
        <label className={styles.subLabel}>Day</label>
        <div className={error && errorStyles.block}>
          <Field name={name + FORMATS.DD} id={name + FORMATS.DD} key={name} maxLength='2' type={'text'} />
        </div>
        {error ? <div className={errorStyles.message}>{error}</div> : null}
      </div>
    );
  }
  return '';
};

const getYearField = (name, format, style, error) => {
  if (style === SUPPORTED_STYLES.HYBRID && format.indexOf(FORMATS.YYYY) != -1) {
    return (
      <div key={name + FORMATS.YYYY} className={styles.yearBlock}>
        <label className={styles.subLabel}>Year</label>
        <div className={error && errorStyles.block}>
          <Field name={name + FORMATS.YYYY} id={name + FORMATS.YYYY} key={name} maxLength='4' type={'text'} />
          {error ? <div className={errorStyles.message}>{error}</div> : null}
        </div>
      </div>
    );
  }
  return '';
};

const DateField = ({ label, name, errors, format = 'DDMMYYYY', style = SUPPORTED_STYLES.HYBRID }) => {
  const { birthDateDD: errorBirthDateDD, birthDateMM: errorBirthDateMM, birthDateYYYY: errorBirthDateYYYY } = errors;
  const dateFields = {
    d: getDayField(name, format, style, errorBirthDateDD),
    m: getMonthField(name, format, style, errorBirthDateMM),
    y: getYearField(name, format, style, errorBirthDateYYYY),
  };
  const formatUniques = format.split('');
  const fieldsOrder = formatUniques.filter((item, index) => formatUniques.indexOf(item) === index);
  const fieldsArray = fieldsOrder.map((item) => dateFields[item.toLowerCase()]);
  return (
    <div className={styles.block}>
      <Label htmlFor={name}>{label}</Label>
      {fieldsArray}
    </div>
  );
};

export default DateField;
