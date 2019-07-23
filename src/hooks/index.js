import React from 'react';

export function useFormValidation(values, validate) {
  const [errors, setErrors] = React.useState({});

  function handleBlur() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }

  return {
    handleBlur,
    errors
  };
}

export default useFormValidation;
