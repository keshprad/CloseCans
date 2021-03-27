import React from "react";
import { Container, Content, Text } from "native-base";

import { ButtonHeader } from "../components/Components";

function Info(props) {
  const { history } = props;

  return (
    <Container>
      <ButtonHeader history={history} title="Info" />
      <Content>
        <Text>This is the Info page!</Text>
      </Content>
    </Container>
  );
}

export default Info;
