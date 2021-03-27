import React from 'react';
import { Body, CheckBox, ListItem, Text } from 'native-base';

function CheckButton(props) {
  return (
    <ListItem>
      <CheckBox checked={false} />
      <Body>
        <Text>{props.btnDesc}</Text>
      </Body>
    </ListItem>
  );
}

export default CheckButton;
