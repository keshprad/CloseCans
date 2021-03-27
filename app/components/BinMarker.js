import { Icon, Text } from "native-base";
import { Image, StyleSheet } from "react-native";
import React from "react";
import { Marker, Callout } from "react-native-maps";

function BinMarker(props) {
  const { type, coordinate } = props;

  return (
    <Marker coordinate={coordinate} title={createLabel(type)}>
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
      return <Icon style={styles.normal} type="Ionicons" name="trash"></Icon>;
    case "recycling":
      return (
        <Icon
          style={styles.recycling}
          type="MaterialCommunityIcons"
          name="recycle"
        ></Icon>
      );
    case "compost":
      return (
        <Icon style={styles.compost} type="Ionicons" name="trash-bin"></Icon>
      );
  }
}

const styles = StyleSheet.create({
  normal: {
    color: "purple",
  },
  recycling: {
    color: "blue",
  },
  compost: {
    color: "green",
  },
});

export default BinMarker;
