import React from 'react';
// import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import { validateSignup } from '../../helpers';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '10%'
  },
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    marginTop: theme.spacing(3)
  },
  typography: {
    fontSize: '1.25rem'
  }
}));

const INIT_VALUES = {
  name: '',
  email: '',
  password: '',
  errors: {
    name: false,
    nameError: '',
    email: false,
    emailError: '',
    password: false,
    passwordError: ''
  }
};

export default function SignUp() {
  const classes = useStyles();
  const [fieldsObj, fieldSetter] = React.useState(INIT_VALUES);
  const { name, email, password } = fieldsObj;
  const [errors, setErrors] = React.useState(INIT_VALUES.errors);

  function setErrorHandling(name, value) {
    const { notValid, message } = validateSignup(name, value);
    if (notValid) {
      setErrors({ ...errors, [name]: true, [`${name}Error`]: message });
    } else {
      setErrors({ ...errors, [name]: false, [`${name}Error`]: '' });
    }
  }

  function changeHandler(evt) {
    const { name, value } = evt.target;
    setErrorHandling(name, value);
    fieldSetter({ ...fieldsObj, [name]: value });
  }

  function blurHandler(evt) {
    const { name, value } = evt.target;
    setErrorHandling(name, value);
  }

  function signUp() {
    console.log('save clicked:', fieldsObj);
    fieldSetter(INIT_VALUES);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography>Sign Up</Typography>
          <form className={classes.form}>
            <TextField
              label="Name"
              onBlur={blurHandler}
              value={name}
              name="name"
              autoComplete="off"
              autoFocus
              onChange={changeHandler}
              margin="normal"
              fullWidth
              required
              error={errors.name}
              helperText={errors.nameError}
            />
            <TextField
              label="Email"
              onBlur={blurHandler}
              value={email}
              name="email"
              autoComplete="off"
              type="email"
              onChange={changeHandler}
              margin="normal"
              fullWidth
              required
              error={errors.email}
              helperText={errors.emailError}
            />
            <TextField
              label="Password"
              onBlur={blurHandler}
              value={password}
              name="password"
              autoComplete="off"
              type="password"
              onChange={changeHandler}
              margin="normal"
              fullWidth
              required
              error={errors.password}
              helperText={errors.passwordError}
            />
            <Button
              onClick={() => signUp()}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Save
            </Button>
          </form>
        </Paper>
      </main>
    </div>
  );
}

// SignUp.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
