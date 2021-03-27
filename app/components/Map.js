import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { View, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";

function Map(props) {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.00184,
    longitudeDelta: 0.000842,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      // Can only get location if permission granted
      if (status !== "granted") {
        console.log("LOCATION PERMISSIONS DENIED");
      } else {
        Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 1,
          },
          (loc) => {
            setRegion({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            });
          }
        );
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;
