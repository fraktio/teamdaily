import React from 'react'
import firebase from 'firebase'
import FirebaseAuth from 'react-firebaseui/dist/FirebaseAuth'

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    // add more auth providers here!
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
}

class RequiresAuthentication extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      initialized: false
    };
  }

  componentDidMount = () => {
    this.props.firebaseApp.auth().onAuthStateChanged((user) => {
      this.setState({ authenticated: !!user, initialized: true });
    })
  }

  render = () => {
    if (!this.state.initialized) {
      return null;
    }

    return this.state.authenticated
      ? this.props.children
      : <FirebaseAuth uiConfig={uiConfig} firebaseAuth={this.props.firebaseApp.auth()} />;
  }
}

export default RequiresAuthentication;
