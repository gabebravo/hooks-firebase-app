import React from 'react';
import { validateFields, transformLoginFields } from '../helpers';

function useForm(initialState, callback) {
  const [fieldsObj, fieldSetter] = React.useState(initialState);

  function setErrorHandling(name, value) {
    const { invalid, error } = validateFields(name, value);
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

  // TEST WHETHER THIS IS CAUSING THE JANKINESS
  // function blurHandler(evt) {
  //   const { name, value } = evt.target;
  //   setErrorHandling(name, value);
  // }

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
      callback();
    }
  }

  return {
    handleSubmit,
    handleBlur: blurHandler,
    handleChange: changeHandler,
    values: fieldsObj
  };
}

export default useForm;
