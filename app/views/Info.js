import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Content, Text } from 'native-base';

import { ButtonHeader } from '../components/Components';

function Info(props) {
  const { history } = props;

  return (
    <Container>
      <ButtonHeader history={history} title="Info" />
      <Content contentContainerStyle={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/infoTable.png')}
        />
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    height: 750,
    width: 'auto',
  },
});

export default Info;
