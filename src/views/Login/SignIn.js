import React from 'react';
//import PropTypes from 'prop-types';
import LockIcon from '@material-ui/icons/LockOutlined';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { validateSignup, transformLoginFields } from '../../helpers';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '10%',
    [theme.breakpoints.down('sm')]: {
      marginTop: '35%'
    }
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
  }
}));

const INIT_VALUES = {
  email: { value: '', invalid: false, error: '' },
  password: { value: '', invalid: false, error: '' }
};

function SignIn() {
  const classes = useStyles();
  const [fieldsObj, fieldSetter] = React.useState(INIT_VALUES);
  const { email, password } = fieldsObj;

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

  function signIn() {
    const fieldErrArr = Object.keys(fieldsObj).map(
      field => fieldsObj[field].invalid
    );
    const hasErrors = fieldErrArr.includes(true);

    if (hasErrors) {
      console.log('Please fix errors');
    } else {
      console.log('data:', transformLoginFields(fieldsObj));
      fieldSetter(INIT_VALUES);
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography>Sign In</Typography>
          <form className={classes.form}>
            <TextField
              label="Email"
              onBlur={blurHandler}
              value={email.value}
              name="email"
              autoComplete="off"
              type="email"
              onChange={changeHandler}
              margin="normal"
              autoFocus
              fullWidth
              required
              error={email.invalid}
              helperText={email.error}
            />
            <TextField
              label="Password"
              onBlur={blurHandler}
              value={password.value}
              name="password"
              autoComplete="off"
              type="password"
              onChange={changeHandler}
              margin="normal"
              fullWidth
              required
              error={password.invalid}
              helperText={password.error}
            />
            <Button
              onClick={() => signIn()}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
          </form>
        </Paper>
      </main>
    </div>
  );
}

// SignIn.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default SignIn;
