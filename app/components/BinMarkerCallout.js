import { Image, StyleSheet, Dimensions } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  View,
} from "native-base";
import React from "react";

function BinMarkerCallout(props) {
  return (
    <View>
      <View style={styles.bubble}>
        <Text style={styles.text}>Text</Text>
        <Text style={styles.text}>More Text</Text>
      </View>
      <View style={styles.arrowBorder} />
      <View style={styles.arrow} />
    </View>
  );
}

const styles = StyleSheet.create({
  arrow: {
    color: "transparent",
    borderColor: "transparent",
    borderTopColor: "white",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    color: "transparent",
    borderColor: "transparent",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
  bubble: {
    flexDirection: "row",
    alignSelf: "flex-start",
    color: "white",
    borderRadius: 8,
    borderColor: "transparent",
    borderWidth: 0.5,
    padding: 16,
    width: Dimensions.get("window").width - 32,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default BinMarkerCallout;
