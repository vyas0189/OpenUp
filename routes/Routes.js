import React, { Component } from "react";
import { Router, Stack, Scene } from "react-native-router-flux";

import Login from "../components/Login";
import Signup from "../components/SignUp";
import Home from "../components/Home";

export default class Routes extends Component<{}> {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar={true}>
          <Scene key="login" component={Login} title="Login" initial={true} />
          <Scene key="signup" component={Signup} title="Register" />
          <Scene key="home" component={Home} title="Home" />
        </Stack>
      </Router>
    );
  }
}
