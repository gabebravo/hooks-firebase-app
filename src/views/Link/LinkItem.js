import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Button } from '@material-ui/core';
import { getDomain } from '../../helpers';
import distanceInDateToNow from 'date-fns/distance_in_words_to_now';

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

function LinkItem({
  id,
  comments,
  created,
  description,
  postedBy,
  url,
  votes,
  count
}) {
  const classes = useStyles();
  return (
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
              {comments.length > 0 ? `${comments.length} comments` : 'discuss'}
            </a>
          </span>
        </Grid>
        <Grid item xs={12} md={4} className={classes.buttonWrapper}>
          <Button variant="outlined" color="primary" className={classes.button}>
            Up Vote
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default LinkItem;
