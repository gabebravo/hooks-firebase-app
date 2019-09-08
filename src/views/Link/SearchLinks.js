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
  Grid,
  List
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FirebaseContext } from '../../context';
import { useForm } from '../../hooks';
import LinkItem from './LinkItem';

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
  },
  message: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '2rem'
  }
}));

const INIT_VALUES = {
  searchTerm: { value: '', invalid: false, error: '' }
};

function SearchLinks(props) {
  const classes = useStyles();
  const { firebase } = React.useContext(FirebaseContext);
  const [links, setLinks] = React.useState(null);
  const [filteredLinks, setFilteredLinks] = React.useState(null);
  const { handleSubmit, handleChange, values } = useForm(
    INIT_VALUES,
    handleCreateLink
  );
  const { searchTerm } = values;

  const getLinks = React.useCallback(() => {
    // onSnapShot can call a callback if its passed as an arg
    firebase.db
      .collection('links')
      .get()
      .then(snapshot => {
        const links = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });
        setLinks(links);
      });
  }, [firebase.db]);

  React.useEffect(() => {
    getLinks();
  }, [getLinks]);

  // formats fields and user info into a record to write to the FS db
  async function handleCreateLink() {
    const query = searchTerm.value.toLowerCase();
    const matchedLinks = links.filter(link => {
      return (
        link.description.value.toLowerCase().includes(query) ||
        link.url.value.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query)
      );
    });
    setFilteredLinks(matchedLinks);
  }

  function renderLinks(filteredLinks) {
    return (
      <List>
        {filteredLinks.map((link, index) => (
          <LinkItem key={link.id} {...link} count={index + 1} />
        ))}
      </List>
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LinkIcon />
          </Avatar>
          <Typography>Search Links</Typography>
          <form className={classes.form}>
            <TextField
              label="Search Term"
              value={searchTerm.value}
              name="searchTerm"
              autoComplete="off"
              type="text"
              onChange={handleChange}
              margin="normal"
              autoFocus
              fullWidth
              required
              error={searchTerm.invalid}
              helperText={searchTerm.error}
            />
            <Button
              onClick={() => handleSubmit()}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Search Links
            </Button>
          </form>
        </Paper>
      </main>
      <div>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={10}>
            {filteredLinks && filteredLinks.length > 0 ? (
              renderLinks(filteredLinks)
            ) : filteredLinks && filteredLinks.length === 0 ? (
              <p className={classes.message}>Sorry... no mathcing articles</p>
            ) : null}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

// CreateLink.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default SearchLinks;
