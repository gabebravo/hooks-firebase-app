export function validateSignup(name, value) {
  let error = { invalid: false, error: '' };

  // name
  if (name === 'name' && !value) {
    error.invalid = true;
    error.error = 'Name is required';
  }

  // Email Errors
  if (name === 'email' && !value) {
    error.invalid = true;
    error.error = 'Email required';
  } else if (
    name === 'email' &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
  ) {
    error.invalid = true;
    error.error = 'Invalid email address';
  }

  // Password Errors
  if (name === 'password' && !value) {
    error.invalid = true;
    error.error = 'Password required';
  } else if (name === 'password' && value.length < 6) {
    error.invalid = true;
    error.error = 'Password must be at least 6 characters';
  }

  return error;
}
