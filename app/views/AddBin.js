import React from "react";
import { Container, Content, Text } from "native-base";

import { ButtonHeader } from "../components/Components";

function AddBin(props) {
  const { history } = props;

  return (
    <Container>
      <ButtonHeader history={history} title="Add Bin" />
      <Content>
        <Text>This is the AddBin page!</Text>
      </Content>
    </Container>
  );
}

export default AddBin;
