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
      <Callout tooltip>
        <BinMarkerCallout></BinMarkerCallout>
      </Callout>
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
  textAlign: "center",
  textAlignVertical: "center",
  borderWidth: 1.0,
};

const styles = StyleSheet.create({
  trash: {
    ...markerIconStyle,
    backgroundColor: "white",
    color: "#726a95",
    borderColor: "#726a95",
  },
  recycling: {
    ...markerIconStyle,
    backgroundColor: "white",
    color: "#709fb0",
    borderColor: "#709fb0",
  },
  compost: {
    ...markerIconStyle,
    backgroundColor: "white",
    color: "#a0c1b8",
    borderColor: "#a0c1b8",
  },
});

export default BinMarker;
