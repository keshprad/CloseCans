import { Badge, Icon, Text, View } from "native-base";
import { Image, StyleSheet } from "react-native";
import React from "react";
import { Marker, Callout } from "react-native-maps";

import BinMarkerCallout from "./BinMarkerCallout";

function BinMarker(props) {
  const { type, coordinate, onPress } = props;

  return (
    <Marker coordinate={coordinate} onPress={onPress}>
      {buildIcon(type)}
    </Marker>
  );
}

function createLabel(type) {
  return type.join(", ");
}

function buildIcon(type) {
  switch (type[0]) {
    case "trash":
      return <Icon style={styles.trash} name="trash" active={false}></Icon>;
    case "recycling":
      return (
        <Icon style={styles.recycling} type="FontAwesome" name="recycle"></Icon>
      );
    case "compost":
      return (
        <Icon
          style={styles.compost}
          type="MaterialCommunityIcons"
          name="sprout"
        ></Icon>
      );
  }
}

const markerIconStyle = {
  fontSize: 18,
  borderRadius: 16,
  width: 32,
  height: 32,
  color: "white",
  textAlign: "center",
  textAlignVertical: "center",
};

const styles = StyleSheet.create({
  trash: {
    ...markerIconStyle,
    backgroundColor: "purple",
  },
  recycling: {
    ...markerIconStyle,
    backgroundColor: "blue",
  },
  compost: {
    ...markerIconStyle,
    backgroundColor: "green",
  },
});

export default BinMarker;
