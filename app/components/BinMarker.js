import { Badge, Icon, Text, View } from "native-base";
import { Image, StyleSheet } from "react-native";
import React from "react";
import { Marker, Callout } from "react-native-maps";

import BinMarkerCallout from "./BinMarkerCallout";
import colors from "../styles/colors";

function BinMarker(props) {
  const { type, coordinate, onPress } = props;

  return (
    <Marker style={styles.marker} coordinate={coordinate} onPress={onPress}>
      {buildIcon(type)}
    </Marker>
  );
}

function buildIcon(type) {
  switch (type[0]) {
    case "trash":
      return (
        <View style={[styles.iconContainer, styles.trash]}>
          <Icon
            style={[styles.icon, styles.trash]}
            type="Ionicons"
            name="trash"
          ></Icon>
        </View>
      );
    case "recycling":
      return (
        <View style={[styles.iconContainer, styles.recycling]}>
          <Icon
            style={[styles.icon, styles.recycling]}
            type="FontAwesome"
            name="recycle"
          ></Icon>
        </View>
      );
    case "compost":
      return (
        <View style={[styles.iconContainer, styles.compost]}>
          <Icon
            style={[styles.icon, styles.compost]}
            type="MaterialCommunityIcons"
            name="sprout"
          ></Icon>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  marker: {},
  iconContainer: {
    backgroundColor: "white",
    borderRadius: 18,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4.0,
  },
  icon: {
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
  },
  trash: {
    color: colors.trash,
    borderColor: colors.trash,
  },
  recycling: {
    color: colors.recycling,
    borderColor: colors.recycling,
  },
  compost: {
    color: colors.compost,
    borderColor: colors.compost,
  },
});

export default BinMarker;
