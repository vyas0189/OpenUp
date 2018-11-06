import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text
} from "native-base";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";
import firebase from "firebase";

class Home extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = (name, event) => {
    // console.log(name, event);
    this.setState({ [name]: event });
  };

  signup = () => {
    Actions.signup();
  };

  home = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        firebase
          .database()
          .ref(`users/${user.user.uid}`)
          .once("value")
          .then(snapshot => {
            Actions.home(snapshot.val());
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input
                name="email"
                placeholder="Email"
                onChangeText={txt => this.handleChange("email", txt)}
              />
            </Item>
            <Item last>
              <Input
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={txt => this.handleChange("password", txt)}
                name="password"
              />
            </Item>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-evenly",
                paddingVertical: 20
              }}
            >
              <Button onPress={this.home}>
                <Text>Sign In</Text>
              </Button>
              <Button onPress={this.signup}>
                <Text>Sign Up</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}
export default Home;
