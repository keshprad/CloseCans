import React, { Component } from "react";
import { Container } from "native-base";
import { NativeRouter, Switch, Route } from "react-router-native";
import { default as AppLoading } from "expo-app-loading";
import * as Font from "expo-font";

// My imports
import { About, Info, Home, AddBin } from "./app/views/Views";

export default class App extends Component {
  state = {
    isReady: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });

    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading onError={console.warn} />;
    }
    return (
      <NativeRouter>
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/add-bin" component={AddBin} />
            <Route exact path="/info" component={Info} />
          </Switch>
        </Container>
      </NativeRouter>
    );
  }
}
