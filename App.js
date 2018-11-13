import React, { Component } from "react";
import Routes from "./routes/Routes";
import firebase from "firebase";
import config from "./firebaseConfig";
import Home from "./components/Home";
import { Container } from "native-base";
class App extends Component {
  constructor(props) {
    console.log("====================================");
    console.log("App");
    console.log("====================================");
    super(props);
    this.state = {
      isAuthReady: false,
      isAuthed: false,
      user: null
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(this.onAuthChanged);
  }

  onAuthChanged = user => {
    this.setState({
      isAuthReady: true
    });
    this.setState({
      isAuthed: !!user
    });
    this.setState({
      user
    });
  };
  render() {
    return <Container>{this.state.isAuthed ? <Home /> : <Routes />}</Container>;
  }
}
export default App;
