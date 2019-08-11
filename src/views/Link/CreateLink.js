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
import { FirebaseContext } from '../../context';
import { useForm } from '../../hooks';
import { transformLinkFields } from '../../helpers';

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

const INIT_MODAL = { showModal: false, message: '', redirect: '/' };

function CreateLink(props) {
  const classes = useStyles();
  const { user, firebase } = React.useContext(FirebaseContext);
  const [modal, setModal] = React.useState(INIT_MODAL);
  const { handleSubmit, handleChange, values } = useForm(
    INIT_VALUES,
    handleCreateLink
  );
  const { description, url } = values;

  // formats fields and user info into a record to write to the FS db
  async function handleCreateLink() {
    try {
      if (!user) {
        setModal({
          showModal: true,
          message: 'You must be logged-in',
          redirect: '/login'
        });
      } else {
        const formattedLinkEntry = transformLinkFields({
          description,
          url,
          user
        }); // if the collection doesn't exist, FS will create it on the first write
        await firebase.db.collection('links').add(formattedLinkEntry);
        setModal({
          showModal: true,
          message: 'Your link has been added',
          redirect: '/'
        });
      }
    } catch (err) {
      console.error(`Couldn't Add Link`, err);
      setModal({ showModal: true, message: err.message, redirect: '/' });
    }
  }

  return (
    <div className={classes.root}>
      {modal.showModal ? (
        <Dialog open={modal.showModal} onClose={() => setModal(INIT_MODAL)}>
          <DialogTitle>Link Submission Message</DialogTitle>
          <DialogContent>
            <DialogContentText>{modal.message || 'NA'}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setModal(INIT_MODAL);
                props.history.push(modal.redirect);
              }}
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
