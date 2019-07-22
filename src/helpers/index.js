export function validateFields(evt, errors) {
  const { name, value } = evt.target;

  // if (reset) {
  //   errors = {};
  // }

  // Email Name
  if (name === 'name' && !value) {
    errors.name = 'Name required';
    return errors;
  }

  // Email Errors
  if (name === 'email' && !value) {
    errors.email = 'Email required';
    return errors;
  } else if (
    name === 'email' &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
  ) {
    errors.email = 'Invalid email address';
    return errors;
  }

  // Password Errors
  if (name === 'password' && !value) {
    errors.password = 'Password required';
    return errors;
  } else if ((name === 'password' && !value) || value.length < 6) {
    errors.password = 'Password must be at least 6 characters';
    return errors;
  }
}
