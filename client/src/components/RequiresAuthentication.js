import React from "react";
import firebase from "firebase";
import { FirebaseAuth } from "react-firebaseui";
import auth from "services/auth";

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    // add more auth providers here!
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
};

class RequiresAuthentication extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      initialized: false
    };
  }

  removeAuthStateChangeObserver = null;

  componentDidMount = () => {
    if (auth.isEnabled) {
      const remove = auth.firebaseApp.auth().onAuthStateChanged(user => {
        this.setState({ authenticated: !!user, initialized: true });
      });

      this.removeAuthStateChangeObserver = remove;
    }
  };

  componentWillUnmount = () => {
    if (this.removeAuthStateChangeObserver) {
      this.removeAuthStateChangeObserver();
    }
  };

  render = () => {
    if (!auth.isEnabled) {
      return this.props.children;
    }

    if (!this.state.initialized) {
      return null;
    }

    return this.state.authenticated
      ? this.props.children
      : <FirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={auth.firebaseApp.auth()}
        />;
  };
}

export default RequiresAuthentication;
