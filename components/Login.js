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

class Login extends Component {
  constructor(props) {
    super(props);
    console.log("====================================");
    console.log("Login");
    console.log("====================================");
  }
  state = {
    email: "",
    password: "",
    err: null,
    status: false
  };

  handleChange = (name, event) => {
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
      .then(() => {
        Actions.home();
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
          {error}
        </Content>
      </Container>
    );
  }
}
export default Login;
