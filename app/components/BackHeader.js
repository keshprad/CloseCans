import React from "react";
import { Button, Header, Icon, Left } from "native-base";

function BackHeader(props) {
  const { history } = props;

  return (
    <Header>
      <Left>
        <Button transparent onPress={() => history.push("/")}>
          <Icon type="MaterialIcons" name="arrow-back-ios" />
        </Button>
      </Left>
    </Header>
  );
}

export default BackHeader;
