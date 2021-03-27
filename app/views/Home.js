import React from "react";
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Title,
  Right,
} from "native-base";

import { Map, Toolbar } from "../components/Components";

function Home(props) {
  const { history } = props;

  return (
    <Container>
      <Header noLeft>
        <Left />
        <Body>
          <Title>Header</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Map />
      </Content>
      <Toolbar history={history}></Toolbar>
    </Container>
  );
}

export default Home;
