import React, { Component } from "react";
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
export class Home extends Component {
  render() {
    // console.log("====================================");
    // console.log(this.props.navigation.state.params);
    // console.log("====================================");
    const {
      email,
      firstName,
      id,
      lastName
    } = this.props.navigation.state.params;
    return (
      <Container>
        <Text>{this.props.navigation.state.params.firstName}</Text>
      </Container>
    );
  }
}

export default Home;
