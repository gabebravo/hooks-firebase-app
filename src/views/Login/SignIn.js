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
  email: '',
  password: '',
  errors: {
    email: false,
    password: false
  }
};

function SignIn() {
  const classes = useStyles();
  const [fieldsObj, fieldSetter] = React.useState(INIT_VALUES);
  const { email, password } = fieldsObj;
  const [errors, setErrors] = React.useState(INIT_VALUES.errors);

  function setErrorHandling(name, value) {
    if (value.length === 0) {
      setErrors({ ...errors, [name]: true });
    } else {
      setErrors({ ...errors, [name]: false });
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

  function signIn() {
    console.log('login clicked:', fieldsObj);
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
          <Typography>Sign In</Typography>
          <form className={classes.form}>
            <TextField
              onBlur={blurHandler}
              label="Email"
              name="email"
              value={email}
              onChange={changeHandler}
              autoComplete="off"
              type="email"
              autoFocus
              margin="normal"
              fullWidth
              required
              error={errors.email}
              helperText={errors.email && 'Email is required'}
            />
            <TextField
              onBlur={blurHandler}
              label="Password"
              name="password"
              value={password}
              onChange={changeHandler}
              autoComplete="off"
              type="password"
              margin="normal"
              fullWidth
              required
              error={errors.password}
              helperText={errors.password && 'Password is required'}
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
