import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
};

const isEnabled = process.env.REACT_APP_FIREBASE_AUTH_ENABLED === "true";
const firebaseApp = isEnabled
  ? firebase.initializeApp(firebaseConfig, "teamdaily")
  : null;

export default {
  isEnabled,
  firebaseApp,
  logout: () => {
    if (isEnabled) {
      firebaseApp.auth().signOut();
    }
  }
};
