import React from 'react';
import {
  Container,
  Body,
  Button,
  Header,
  Icon,
  Title,
  Left,
  Right,
} from 'native-base';

function ButtonHeader(props) {
  const { history, title } = props;

  return (
    <Header>
      <Left>
        <Button transparent onPress={() => history.push('/')}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right />
    </Header>
  );
}

export default ButtonHeader;
