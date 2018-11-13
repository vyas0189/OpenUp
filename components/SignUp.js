import React, { Component } from "react";
import { View } from "react-native";
import {
  Container,
  Header,
  Content,
  Input,
  Item,
  Form,
  Button,
  Text
} from "native-base";
import firebase from "firebase";
import "firebase/firestore";
import { Actions } from "react-native-router-flux";
//import AddImage from "./AddImage";

class SignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    image: null,
    password: "",
    err: null
  };

  handleChange = (name, event) => {
    this.setState({ [name]: event });
  };
  upLoadData = e => {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    let { firstName, lastName, email, image, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        const id = newUser.user.uid;
        const insertPath = db.collection("users").doc(`${id}`);

        insertPath
          .set({
            id: newUser.user.uid,
            firstName: firstName,
            lastName: lastName,
            email: email,
            image:
              "https://cdn.pixabay.com/photo/2017/06/26/02/47/people-2442565__340.jpg",
            password: password,
            isLoggedIn: false
          })
          .then(() => {
            console.log("INSERTED!");
            Actions.login();
          })
          .catch(err => {
            this.setState({ err: err.message });
            console.log(err.message);
          });
      })
      .catch(err => {
        this.setState({ err: err.message });
        console.log(err.message);
      });
  };

  render() {
    const error = this.state.err ? <Text>{this.state.err}</Text> : null;
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input
                placeholder="First Name"
                onChangeText={txt => this.handleChange("firstName", txt)}
              />
            </Item>

            <Item>
              <Input
                placeholder="Last Name"
                onChangeText={txt => this.handleChange("lastName", txt)}
              />
            </Item>
            <Item>
              <Input
                placeholder="Email"
                onChangeText={txt => this.handleChange("email", txt)}
              />
            </Item>

            <Item last>
              <Input
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={txt => this.handleChange("password", txt)}
              />
            </Item>

            <View
              style={{
                width: "100%",
                justifyContent: "center",
                paddingVertical: 20
              }}
            >
              <Button
                style={{
                  width: "100%"
                }}
                full
                onPress={this.upLoadData}
              >
                <Text>Submit</Text>
              </Button>
            </View>
            {error}
          </Form>
        </Content>
      </Container>
    );
  }
}

export default SignUp;
