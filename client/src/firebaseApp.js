import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
};

export default firebase.initializeApp(config, "teamdaily");
