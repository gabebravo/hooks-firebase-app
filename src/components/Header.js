import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LinkIcon from '@material-ui/icons/Link';
import { withRouter, NavLink } from 'react-router-dom';
import { FirebaseContext } from '../context';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  loginButton: {
    flex: '1',
    justifyContent: 'flex-end'
  },
  linkStyles: {
    textDecoration: 'none',
    color: '#fff'
  },
  menuLinkStyles: {
    textDecoration: 'none',
    color: '#000'
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  toolbarWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '85%',
    [theme.breakpoints.down('sm')]: {
      width: '51%'
    }
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '15%',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '49%',
      justifyContent: 'flex-end'
    }
  }
}));

const links = {
  New: '/',
  Top: '/top',
  Search: '/search',
  Submit: '/create'
};

function Header({ headerText }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { user, firebase } = React.useContext(FirebaseContext);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function logoutUser() {
    firebase.logout();
  }

  function returnNavLink(text) {
    if (text !== 'Submit' || (text === 'Submit' && user)) {
      return (
        <NavLink key={text} className={classes.menuLinkStyles} to={links[text]}>
          <ListItem button>
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        </NavLink>
      );
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <div className={classes.toolbarWrapper}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              <NavLink className={classes.linkStyles} to="/">
                {headerText}
              </NavLink>
            </Typography>
          </div>
          <div className={classes.buttonWrapper}>
            {user ? (
              <>
                <div style={{ fontSize: '1rem' }}>{user.displayName} | </div>
                <Button onClick={logoutUser} color="inherit">
                  LOG OUT
                </Button>
              </>
            ) : (
              <Button className={classes.loginButton} color="inherit">
                <NavLink className={classes.linkStyles} to="/login">
                  LOGIN
                </NavLink>
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['New', 'Top', 'Search', 'Submit'].map(text => returnNavLink(text))}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}

export default withRouter(Header);
