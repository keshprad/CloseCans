import React from "react";
import { Button, Icon, Footer, FooterTab } from "native-base";

import FooterButton from "./FooterButton";

function Toolbar(props) {
  const { history } = props;

  return (
    <Footer>
      <FooterTab>
        <FooterButton path="/about" history={history}>
          <Icon type="MaterialCommunityIcons" name="information-variant" />
        </FooterButton>
        <FooterButton path="/add-bin" history={history}>
          <Icon type="Feather" name="plus" />
        </FooterButton>
        <FooterButton path="/" history={history}>
          <Icon type="Ionicons" name="home-outline" />
        </FooterButton>
        <Button onPress={() => history.push("/")}>
          <Icon type="MaterialCommunityIcons" name="magnify" />
        </Button>
        <FooterButton path="/info" history={history}>
          <Icon type="AntDesign" name="questioncircleo" />
        </FooterButton>
      </FooterTab>
    </Footer>
  );
}

export default Toolbar;
