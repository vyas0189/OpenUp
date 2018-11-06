import React, { Component } from "react";
import { Container, Header, Content, Text } from "native-base";
export class Home extends Component {
  render() {
    // console.log("====================================");
    // console.log(this.props.navigation.state.params);
    // console.log("====================================");
    const {
      email,
      firstName,
      id,
      lastName,
      image
    } = this.props.navigation.state.params;
    return (
      <Container>
        <Header />
        <Content>
          <Text>{`Welcome, ${firstName} ${lastName}`}</Text>
        </Content>
      </Container>
    );
  }
}

export default Home;
