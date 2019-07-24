import React from 'react';
import firebase from '../firebase';

function useAuth() {
  const [authUser, setAuthUser] = React.useState(null);

  // will run on mount only
  React.useEffect(() => {
    // firebase func to get auth state
    const unsubscribe = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        // if logged in
        setAuthUser(user); // set the user state
      } else {
        setAuthUser(null); // if not, pass default null value
      }
    });

    return () => unsubscribe(); // unsubscribe on unmount
  }, []);

  return authUser;
}

export default useAuth;
