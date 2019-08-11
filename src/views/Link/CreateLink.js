import React from 'react';
//import PropTypes from 'prop-types';
import LinkIcon from '@material-ui/icons/Link';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from '../../hooks';
// import firebase from '../../firebase';

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
  description: { value: '', invalid: false, error: '' },
  url: { value: '', invalid: false, error: '' }
};

const INIT_MODAL = { showModal: false, message: '' };

function CreateLink(props) {
  const classes = useStyles();
  const [modal, setModal] = React.useState(INIT_MODAL);
  const { handleSubmit, handleChange, values } = useForm(
    INIT_VALUES,
    handleCreateLink
  );
  const { description, url } = values;

  async function handleCreateLink() {
    console.log('add link submitted');
  }

  // async function authenticateUser() {
  //   try {
  //     await firebase.login(email.value, url.value);
  //     props.history.push('/');
  //   } catch (err) {
  //     console.error('Authentication Error', err);
  //     setModal({ showModal: true, message: err.message });
  //   }
  // }

  return (
    <div className={classes.root}>
      {modal.showModal ? (
        <Dialog open={modal.showModal} onClose={() => setModal(INIT_MODAL)}>
          <DialogTitle>Authentication Error</DialogTitle>
          <DialogContent>
            <DialogContentText>{modal.message || 'NA'}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setModal(INIT_MODAL)}
              color="primary"
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LinkIcon />
          </Avatar>
          <Typography>Add Link</Typography>
          <form className={classes.form}>
            <TextField
              label="Description"
              value={description.value}
              name="description"
              autoComplete="off"
              type="text"
              onChange={handleChange}
              margin="normal"
              autoFocus
              fullWidth
              required
              error={description.invalid}
              helperText={description.error}
            />
            <TextField
              label="URL"
              value={url.value}
              name="url"
              autoComplete="off"
              type="text"
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
              error={url.invalid}
              helperText={url.error}
            />
            <Button
              onClick={() => handleSubmit()}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add Link
            </Button>
          </form>
        </Paper>
      </main>
    </div>
  );
}

// CreateLink.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default CreateLink;
