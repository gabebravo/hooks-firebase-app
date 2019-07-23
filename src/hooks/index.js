import React from 'react';
import { validateSignup, transformLoginFields } from '../helpers';

export function useForm(initialState, authenticate) {
  const [fieldsObj, fieldSetter] = React.useState(initialState);

  function setErrorHandling(name, value) {
    const { invalid, error } = validateSignup(name, value);
    if (invalid) {
      fieldSetter({
        ...fieldsObj,
        [name]: { ...fieldsObj[name], invalid, error, value }
      });
    } else {
      fieldSetter({
        ...fieldsObj,
        [name]: { value, invalid: false, error: '' }
      });
    }
  }

  function changeHandler(evt) {
    const { name, value } = evt.target;
    setErrorHandling(name, value);
  }

  function blurHandler(evt) {
    const { name, value } = evt.target;
    setErrorHandling(name, value);
  }

  function handleSubmit() {
    const fieldErrArr = Object.keys(fieldsObj).map(
      field => fieldsObj[field].invalid
    );
    const hasErrors = fieldErrArr.includes(true);

    if (hasErrors) {
      console.log('Please fix errors');
    } else {
      console.log('data:', transformLoginFields(fieldsObj));
      fieldSetter(initialState);
      authenticate();
    }
  }

  return {
    handleSubmit,
    handleBlur: blurHandler,
    handleChange: changeHandler,
    values: fieldsObj
  };
}
