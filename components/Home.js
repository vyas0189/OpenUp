import React, { Component } from "react";
import { View, Container, Header, Content, Text, Button } from "native-base";
import firebase from "firebase";
import Login from "./Login";
import "firebase/firestore";
export class Home extends Component {
  constructor(props) {
    console.log("====================================");
    console.log("Home");
    console.log("====================================");
    super(props);
    this.state = {
      user: {}
    };
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const userID = firebase.auth().currentUser.uid;
    const docRef = db.collection("users").doc(`${userID}`);
    docRef
      .get()
      .then(snapshot => {
        this.setState({
          user: snapshot.data()
        });
      })
      .catch(err => {
        this.setState({ err: err.message });
        console.log(err.message);
      });
  }

  signOut = () => {
    firebase.auth().signOut();
  };
  render() {
    return (
      <Container>
        <Content>
          <Text>{`Welcome, ${this.state.user.firstName} ${
            this.state.user.lastName
          }`}</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingVertical: 20
            }}
          >
            <Button onPress={this.signOut}>
              <Text>Sign Out</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Home;
