import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import { getDomain } from '../../helpers';
import distanceInDateToNow from 'date-fns/distance_in_words_to_now';
import { FirebaseContext } from '../../context';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  gridWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: '1rem',
    [theme.breakpoints.only('xs')]: {
      fontSize: 'inherit'
    }
  },
  listPaper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.only('xs')]: {
      justifyContent: 'flex-start'
    }
  },
  button: {
    margin: theme.spacing(1)
  },
  votesWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.only('xs')]: {
      padding: 4
    }
  }
}));

const INIT_MODAL = { showModal: false, message: '' };

function LinkItem({
  id,
  comments,
  created,
  description,
  postedBy,
  url,
  votes,
  count,
  history
}) {
  const classes = useStyles();
  const [modal, setModal] = React.useState(INIT_MODAL);
  const { user, firebase } = React.useContext(FirebaseContext);

  function handleVote() {
    if (!user) {
      history.push('/login');
    } else {
      const voteRef = firebase.db.collection('links').doc(id);
      voteRef.get().then(doc => {
        if (doc.exists) {
          const prevVotes = doc.data().votes;
          const newVote = { votedBy: { id: user.uid, name: user.displayName } };
          const updatedVotes = [...prevVotes, newVote];
          voteRef.update({ votes: updatedVotes });
        }
      });
    }
  }

  function handleDelete() {
    const linkRef = firebase.db.collection('links').doc(id);
    linkRef
      .delete()
      .then(() => {
        setModal({
          showModal: true,
          message: `Document with ID ${id} deleted`
        });
      })
      .catch(err => {
        console.log('Error deleting document:', err);
      });
  }

  const postedByAuthUser = user && user.uid === postedBy.id;

  return (
    <>
      {modal.showModal ? (
        <Dialog open={modal.showModal} onClose={() => setModal(INIT_MODAL)}>
          <DialogTitle>Link Status</DialogTitle>
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
      <Paper className={classes.listPaper}>
        <Grid container className={classes.gridWrapper}>
          <Grid item xs={12} md={4}>
            {count}. {description && description.value} :
            <span style={{ marginLeft: 5 }}>
              <a
                className={classes.link}
                target="_blank"
                rel="noopener noreferrer"
                href={url && url.value}
              >
                {url && getDomain(url.value)}
              </a>
            </span>
          </Grid>
          <Grid item xs={12} md={4} className={classes.votesWrapper}>
            {votes.length} votes by {postedBy.name}
            {' • '}
            {distanceInDateToNow(created)} ago
            {' | '}
            <span style={{ marginLeft: 5 }}>
              <a
                className={classes.link}
                target="_blank"
                rel="noopener noreferrer"
                href={`/link/${id}`}
              >
                {comments.length > 0
                  ? `${comments.length} comments`
                  : 'discuss'}
              </a>
            </span>
          </Grid>
          <Grid item xs={12} md={4} className={classes.buttonWrapper}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={handleVote}
            >
              Up Vote
            </Button>
            {postedByAuthUser && (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default withRouter(LinkItem);
