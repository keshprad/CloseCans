import React from 'react';
import { Linking } from 'react-native';
import { Text } from 'native-base';

import colors from '../styles/colors';

function Hyperlink(props) {
  const { underline, to } = props;
  return <Text onPress={() => Linking.openURL(to)}>{props.children}</Text>;
}

export default Hyperlink;
