import React from 'react';
//import PropTypes from 'prop-types';
import LockIcon from '@material-ui/icons/LockOutlined';
import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  }
}));

const INIT_VALUES = {
  email: '',
  password: ''
};

function SignIn() {
  const classes = useStyles();
  const [fieldsObj, fieldSetter] = React.useState(INIT_VALUES);
  const { email, password } = fieldsObj;

  function fieldHandler(evt) {
    const { name, value } = evt.target;
    fieldSetter({ ...fieldsObj, [name]: value });
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
            <FormControl margin="normal" fullWidth required>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                value={email}
                name="email"
                autoComplete="off"
                type="email"
                autoFocus
                onChange={fieldHandler}
              />
            </FormControl>
            <FormControl margin="normal" fullWidth required>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                value={password}
                name="password"
                autoComplete="off"
                type="password"
                onChange={fieldHandler}
              />
            </FormControl>
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
