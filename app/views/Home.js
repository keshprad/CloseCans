import React from "react";
import { Container, Content, Header } from "native-base";

import { Map, Toolbar } from "../components/Components";

function Home(props) {
  const { history } = props;

  return (
    <Container>
      <Header />
      <Content>
        <Map />
      </Content>
      <Toolbar history={history}></Toolbar>
    </Container>
  );
}

export default Home;
