import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Container, Text } from 'native-base';
import { NativeRouter, Switch, Route } from 'react-router-native';

// My imports
import { About, Info, Home, AddBin } from './app/views/Views';

export default function App() {
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
