import React from "react";
import { Container, Content, Header, Text } from "native-base";

import { BackHeader } from "../components/Components";

function Info(props) {
  const { history } = props;

  return (
    <Container>
      <BackHeader history={history} />
      <Content>
        <Text>This is the Info page!</Text>
      </Content>
    </Container>
  );
}

export default Info;
