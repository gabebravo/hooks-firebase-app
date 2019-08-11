export function validateFields(name, value) {
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

  // Description Errors
  if (name === 'description' && !value) {
    error.invalid = true;
    error.error = 'Description required';
  } else if (name === 'description' && value.length < 10) {
    error.invalid = true;
    error.error = 'Description must be at least 10 characters';
  }

  // URL Errors
  if (name === 'url' && !value) {
    error.invalid = true;
    error.error = 'URL required';
  } else if (name === 'url' && !/^(ftp|http|https):\/\/[^ "]+$/i.test(value)) {
    error.invalid = true;
    error.error = 'Invalid URL address';
  }

  return error;
}

export function transformLoginFields(dataObj) {
  const fieldErrArr = Object.keys(dataObj).reduce((acc, key) => {
    acc[key] = dataObj[key].value;
    return acc;
  }, {});
  return fieldErrArr;
}

export function transformLinkFields({ description, url, user }) {
  const linkObj = {
    url,
    description,
    postedBy: {
      id: user.uid,
      name: user.displayName
    },
    votes: [],
    comments: [],
    created: Date.now()
  };
  return linkObj;
}
