import React from "react";
import { Container, Content, Header, Text } from "native-base";

import { BackHeader } from "../components/Components";

function About(props) {
  const { history } = props;

  return (
    <Container>
      <BackHeader history={history} />
      <Content>
        <Text>This is the About page!</Text>
      </Content>
    </Container>
  );
}

export default About;
