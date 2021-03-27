import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Text } from 'native-base';

import colors from '../styles/colors';

function Hyperlink(props) {
  const { underline, to } = props;
  return (
    <Text
      style={[
        styles.link,
        { textDecorationLine: underline ? 'underline' : 'none' },
      ]}
      onPress={() => Linking.openURL(to)}
    >
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  link: {
    color: colors.accent1,
  },
});

export default Hyperlink;
