import React from "react";
import { Container, Text } from "native-base";

import { Home } from "./app/views/Views";

export default function App() {
  return (
    <Container style={styles.container}>
      <Home></Home>
    </Container>
  );
}
