import React from 'react';
// import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';

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
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing(3)
  },
  typography: {
    fontSize: '1.25rem'
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const [fieldsObj, fieldSetter] = React.useState({
    username: '',
    email: '',
    password: ''
  });
  const { username, email, password, phone_number } = fieldsObj;

  function phoneRenderFormat(number) {
    const phoneRegex = /(\d{0,3})(\d{0,3})(\d{0,4})/;
    let ph = number.replace(/\D/g, '').match(phoneRegex);
    ph = !ph[2]
      ? ph[1]
      : '(' + ph[1] + ') ' + ph[2] + (ph[3] ? '-' + ph[3] : '');
    return ph;
  }

  function fieldHandler(evt) {
    const { name, value } = evt.target;
    const finalValue =
      name === 'phone_number' ? phoneRenderFormat(value) : value;
    fieldSetter({ ...fieldsObj, [name]: finalValue });
  }

  function signUp() {
    console.log('save clicked');
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
            <FormControl margin="normal" fullWidth required>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                value={username}
                name="username"
                autoComplete="off"
                autoFocus
                onChange={fieldHandler}
              />
            </FormControl>
            <FormControl margin="normal" fullWidth required>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                value={email}
                name="email"
                autoComplete="off"
                type="email"
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
            <FormControl margin="normal" fullWidth required>
              <InputLabel htmlFor="phone_number">Phone Number</InputLabel>
              <Input
                value={phone_number}
                name="phone_number"
                autoComplete="off"
                onChange={fieldHandler}
              />
            </FormControl>
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
