import React from "react";
import { Container, Content, Header, Text } from "native-base";

import { BackHeader } from "../components/Components";

function AddBin(props) {
  const { history } = props;

  return (
    <Container>
      <BackHeader history={history} />
      <Content>
        <Text>This is the AddBin page!</Text>
      </Content>
    </Container>
  );
}

export default AddBin;
