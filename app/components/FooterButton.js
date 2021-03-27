import React from "react";
import { Button, Text } from "native-base";

function FooterButton(props) {
  const { history, path } = props;

  return (
    <Button
      active={history.location.pathname === path}
      onPress={() => history.push(path)}
    >
      {props.children}
    </Button>
  );
}

export default FooterButton;
