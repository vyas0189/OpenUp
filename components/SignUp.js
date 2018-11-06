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
import uuid from "react-native-uuid";
//import AddImage from "./AddImage";

class SignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    image: null,
    password: ""
  };

  handleChange = (name, event) => {
    this.setState({ [name]: event });
  };
  upLoadData = e => {
    let userId = uuid.v4();
    let { firstName, lastName, email, image, password } = this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        firebase
          .database()
          .ref()
          .child(`users/${newUser.user.uid}`)
          .set({
            id: newUser.user.uid,
            firstName: firstName,
            lastName: lastName,
            email: email,
            image: image,
            password: password
          })
          .then(() => {
            console.log("INSERTED!");
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
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
          </Form>
        </Content>
      </Container>
    );
  }
}

export default SignUp;
