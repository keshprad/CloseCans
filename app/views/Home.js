import React from "react";
import { Container, Content, Header } from "native-base";

import { Map, Toolbar } from "../components/Components";

function Home(props) {
  return (
    <Container>
      <Header />
      <Content>
        <Map />
      </Content>
      <Toolbar></Toolbar>
    </Container>
  );
}

export default Home;
