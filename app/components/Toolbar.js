import React from "react";
import { Container, Text } from "native-base";
import { Button, Footer, FooterTab } from "native-base";

import FooterButton from "./FooterButton";

function Toolbar(props) {
  const { history } = props;

  return (
    <Footer>
      <FooterTab>
        <FooterButton path="/about" history={history}></FooterButton>
        <FooterButton path="/info" history={history}></FooterButton>
        <FooterButton path="/" history={history}></FooterButton>
        <FooterButton path="/" history={history}></FooterButton>
        <FooterButton path="/add-bin" history={history}></FooterButton>
      </FooterTab>
    </Footer>
  );
}

export default Toolbar;
