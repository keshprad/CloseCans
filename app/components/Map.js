const axios = require("axios");

import React, { createRef, useState, useEffect, useRef } from "react";
import MapView from "react-native-maps";
import { Animated, Platform, View, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";

import BinMarker from "./BinMarker";
import BinMarkerCallout from "./BinMarkerCallout";

import { backend_domain } from "../helpers/Helper";

const sample_bins = [
  {
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    binType: ["trash"],
    uploadTime: "Mar 15, 2021",
  },
  {
    coordinates: {
      latitude: 37.30757699280724,
      longitude: -122.01661523830575,
    },
    binType: ["trash"],
    uploadTime: "Mar 15, 2021",
  },
  {
    coordinates: {
      latitude: 37.30755699280724,
      longitude: -122.01661623830575,
    },
    binType: ["trash", "recycling", "compost"],
    uploadTime: "Mar 15, 2021",
  },
  {
    coordinates: {
      latitude: 37.30787948833927,
      longitude: -122.01654157463312,
    },
    binType: ["recycling"],
    uploadTime: "Mar 15, 2021",
  },
  {
    coordinates: {
      latitude: 37.30802392271359,
      longitude: -122.01645420609117,
    },
    binType: ["compost"],
    uploadTime: "Mar 15, 2021",
  },
  {
    coordinates: {
      latitude: 37.30787948833927,
      longitude: -122.01645420609117,
    },
    binType: ["trash", "recycling"],
    uploadTime: "Mar 15, 2021",
  },
];

function Map(props) {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.00184,
    longitudeDelta: 0.000842,
  });
  const [cameraRegion, setCameraRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.00184,
    longitudeDelta: 0.000842,
  });
  const [pressedBin, setPressedBin] = useState({
    coordinate: {
      latitude: 0,
      longitude: 0,
    },
    binType: ["trash"],
    uploadTime: "Not Available",
  });

  const _map = createRef();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  let isInit = true;

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

            setCameraRegion({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            });
          }
        );

        const bins = (
          await axios.post(`${backend_domain}/bins`, {
            latitude: region.latitude,
            longitude: region.longitude,
          })
        ).data;
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={cameraRegion}
        ref={_map}
        showsUserLocation
      >
        {sample_bins.map((item, index) => (
          <BinMarker
            key={index}
            coordinate={item.coordinates}
            type={item.binType}
            onPress={(e) => {
              // e.stopPropagation();
              // _map.current.animateCamera({
              //   center: {
              //     latitude: item.coordinates.latitude,
              //     longitude: item.coordinates.longitude,
              //   },
              // });

              console.log(cameraRegion);

              setCameraRegion({
                latitude: item.coordinates.latitude,
                longitude: item.coordinates.longitude,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
              });

              setPressedBin({
                coordinate: {
                  latitude: item.coordinates.latitude,
                  longitude: item.coordinates.longitude,
                },
                binType: item.binType,
                uploadTime: item.uploadTime,
              });

              fadeIn();
            }}
          ></BinMarker>
        ))}
      </MapView>
      <View style={[styles.float]}>
        <Animated.View
          style={[
            {
              opacity: fadeAnim, // Bind opacity to animated value
            },
          ]}
        >
          <BinMarkerCallout
            type={pressedBin.binType}
            uploadTime={pressedBin.uploadTime}
            onClosePress={() => {
              fadeOut();
            }}
            distance={calculateDistance()}
          ></BinMarkerCallout>
        </Animated.View>
      </View>
    </View>
  );
}

function calculateDistance() {
  return 0;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  roundBorder: {
    borderRadius: 8,
  },
  float: {
    position: "absolute",
    top: Dimensions.get("window").height - 360,
  },
});

export default Map;
