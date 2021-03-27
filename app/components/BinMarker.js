import { Badge, Icon, Text, View } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import React from 'react';
import { Marker, Callout } from 'react-native-maps';

import BinMarkerCallout from './BinMarkerCallout';

function BinMarker(props) {
  const { type, coordinate, onMarkerPress } = props;

  return (
    <Marker
      style={styles.container}
      coordinate={coordinate}
      onPress={() => {
        onPress();
      }}
    >
      {buildIcon(type)}
      <Callout tooltip>
        <BinMarkerCallout></BinMarkerCallout>
      </Callout>
    </Marker>
  );
}

function createLabel(type) {
  return type.join(', ');
}

function buildIcon(type) {
  switch (type[0]) {
    case 'trash':
      return (
        <View style={[styles.trash, styles.iconContainer]}>
          <Icon style={styles.icon} name="trash" active={false} />
        </View>
      );
    case 'recycling':
      return (
        <View style={[styles.recycling, styles.iconContainer]}>
          <Icon style={styles.icon} type="FontAwesome" name="recycle"></Icon>
        </View>
      );
    case 'compost':
      return (
        <View style={[styles.compost, styles.iconContainer]}>
          <Icon
            style={styles.icon}
            type="MaterialCommunityIcons"
            name="sprout"
          ></Icon>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  icon: {
    color: 'white',
    fontSize: 18,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compost: {
    backgroundColor: 'green',
  },
  trash: {
    backgroundColor: 'purple',
  },
  recycling: {
    backgroundColor: 'blue',
  },
});

export default BinMarker;
