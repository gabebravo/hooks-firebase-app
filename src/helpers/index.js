export function validateSignup(name, value) {
  let error = { notValid: false, message: '' };

  // name
  if (name === 'name' && !value) {
    error.notValid = true;
    error.message = 'Name is required';
  }

  // Email Errors
  if (name === 'email' && !value) {
    error.notValid = true;
    error.message = 'Email required';
  } else if (
    name === 'email' &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
  ) {
    error.notValid = true;
    error.message = 'Invalid email address';
  }

  // Password Errors
  if (name === 'password' && !value) {
    error.notValid = true;
    error.message = 'Password required';
  } else if (name === 'password' && value.length < 6) {
    error.notValid = true;
    error.message = 'Password must be at least 6 characters';
  }

  return error;
}
