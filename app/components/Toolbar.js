import React from "react";
import { Container, Text } from "native-base";
import { Button, Footer, FooterTab } from "native-base";

import FooterButton from "./FooterButton";

function Toolbar(props) {
  const { history } = props;

  return (
    <Footer>
      <FooterTab>
        <FooterButton></FooterButton>
        <FooterButton></FooterButton>
        <FooterButton></FooterButton>
        <FooterButton></FooterButton>
        <FooterButton></FooterButton>
      </FooterTab>
    </Footer>
  );
}

export default Toolbar;
