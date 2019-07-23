import app from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './config';

class Firebase {
  // Initialize Firebase & Auth
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }

  // register method used to add new users
  async register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    // method will return the promise from the API
    return await newUser.user.updateProfile({
      displayName: name
    });
  }

  // login method will return the promise from the API
  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }
}

// Instantiate an instance and export it
const firebase = new Firebase();
export default firebase;
