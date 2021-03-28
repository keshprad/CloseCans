import { Image, StyleSheet, Dimensions } from "react-native";
import {
  Body,
  Icon,
  Card,
  CardItem,
  Left,
  Right,
  Text,
  View,
  Button,
} from "native-base";
import React from "react";
import colors from "../styles/colors";

function BinMarkerCallout(props) {
  const { type, uploadTime, onClosePress, distance } = props;

  return (
    <View>
      <Card style={[styles.bubble, styles.roundBorder]}>
        <CardItem header bordered style={[styles.roundBorder]}>
          <View flexDirection="column">
            <Text style={styles.headerText}>{createTypeLabel(type)}</Text>
            <Text style={styles.bodyText}>{distance} Ft Away</Text>
          </View>
          <Left></Left>
          <Body></Body>
          <Right>
            <Button transparent onPress={onClosePress}>
              <Icon
                type="MaterialIcons"
                name="close"
                style={{ color: "gray" }}
              />
            </Button>
          </Right>
        </CardItem>
        <CardItem bordered style={[styles.roundBorder]}>
          <Left>
            <Text style={[styles.bodyText, { color: "gray" }]}>UPDATED</Text>
            <Text style={styles.bodyText}>{createTimeLabel(uploadTime)}</Text>
          </Left>
          <Right>
            {/* <Button
              transparent
              onPress={() =>
                alert("Are you certain the bin you found does not exist?")
              }
            >
              <Text style={[styles.bodyText, { color: "red" }]}>Report</Text>
            </Button> */}
          </Right>
        </CardItem>
      </Card>
      {/* <View style={styles.arrowBorder} />
      <View style={styles.arrow} /> */}
    </View>
  );
}

function createTypeLabel(type) {
  return (type !== undefined ? type.join(", ") : "").toUpperCase();
}

function createTimeLabel(uploadTime) {
  return uploadTime !== undefined ? uploadTime : "Not Available";
}

const styles = StyleSheet.create({
  arrow: {
    borderColor: "transparent",
    borderTopColor: "white",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    borderColor: "transparent",

    borderWidth: 16,
    alignSelf: "center",
    marginTop: -1.0,
  },
  roundBorder: {
    borderRadius: 8,
  },
  bubble: {
    flexDirection: "column",
    width: Dimensions.get("window").width - 32,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bodyText: {
    fontSize: 14,
  },
});

export default BinMarkerCallout;
