import { Icon, Text } from "native-base";
import { Image, StyleSheet } from "react-native";
import React from "react";
import { Marker, Callout } from "react-native-maps";

function BinMarker(props) {
  const { isRecycle, coordinate } = props;

  return (
    <Marker coordinate={coordinate}>
      {isRecycle ? (
        <Icon
          style={styles.recycle}
          type="MaterialCommunityIcons"
          name="recycle"
        ></Icon>
      ) : (
        <Icon style={styles.normal} type="Ionicons" name="trash"></Icon>
      )}
      <Callout>
        <Text>
          <Image source={require("../assets/normal_bin.jpg")} />
        </Text>
      </Callout>
    </Marker>
  );
}

const styles = StyleSheet.create({
  recycle: {
    color: "green",
  },
  normal: {
    color: "purple",
  },
});

export default BinMarker;
