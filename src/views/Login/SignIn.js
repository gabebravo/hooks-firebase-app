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
import { useForm } from '../../hooks';
import firebase from '../../firebase';

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
  const { handleSubmit, handleBlur, handleChange, values } = useForm(
    INIT_VALUES,
    authenticateUser
  );
  const { email, password } = values;

  async function authenticateUser() {
    const response = await firebase.login(email.value, password.value);
    console.log('response:', { response });
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
              onBlur={handleBlur}
              value={email.value}
              name="email"
              autoComplete="off"
              type="email"
              onChange={handleChange}
              margin="normal"
              autoFocus
              fullWidth
              required
              error={email.invalid}
              helperText={email.error}
            />
            <TextField
              label="Password"
              onBlur={handleBlur}
              value={password.value}
              name="password"
              autoComplete="off"
              type="password"
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
              error={password.invalid}
              helperText={password.error}
            />
            <Button
              onClick={() => handleSubmit()}
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
