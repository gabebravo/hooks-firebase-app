import React from 'react';
import Header from './Header';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CreateLink from '../views/Link/CreateLink';
import Login from '../views/Login';
import ForgotPassword from './Auth/ForgotPassword';
import SearchLinks from '../views/Link/SearchLinks';
import LinkList from '../views/Link/LinkList';
import LinkDetail from '../views/Link/LinkDetail';
import { useAuth } from '../hooks';
import firebase from '../firebase';
import { FirebaseContext } from '../context';

function App() {
  const user = useAuth();
  console.log('user', user);

  return (
    <BrowserRouter>
      <FirebaseContext.Provider value={{ user, firebase }}>
        <Header headerText="Firebase News" />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/new/1" />} />
          <Route path="/create" component={CreateLink} />
          <Route path="/login" component={Login} />
          <Route path="/forgot" component={ForgotPassword} />
          <Route path="/search" component={SearchLinks} />
          <Route path="/top" component={LinkList} />
          <Route path="/new/:page" component={LinkList} />
          <Route path="/link/:linkId" component={LinkDetail} />
        </Switch>
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
