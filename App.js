import React, { Component } from "react";
import { View } from "react-native";
import Routes from "./routes/Routes";
import firebase from "firebase";
import config from "./firebaseConfig";
class App extends Component {
  componentWillMount() {
    firebase.initializeApp(config);
  }
  render() {
    return <Routes />;
  }
}
export default App;
