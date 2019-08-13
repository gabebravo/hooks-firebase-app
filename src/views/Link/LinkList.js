import React from 'react';
import { FirebaseContext } from '../../context';

function LinkList(props) {
  const { firebase } = React.useContext(FirebaseContext);

  React.useEffect(() => {
    getLinks();
  }, []);

  function getLinks() {
    // onSnapShot can call a callback if its passed as an arg
    firebase.db.collection('links').onSnapshot(handleSnapshot);
  }

  // the snapshot arg is a copy of our data >> snapshot.docs is an array
  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });

    console.log('links:', { links });
  }

  return <div style={{ fontSize: '22rem' }}>LinkList</div>;
}

export default LinkList;
