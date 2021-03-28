const axios = require('axios');

import React, { createRef, useState, useEffect, useRef } from 'react';
import MapView from 'react-native-maps';
import { Animated, Platform, View, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';

import BinMarker from './BinMarker';
import BinMarkerCallout from './BinMarkerCallout';

import { backend_domain, calculateDistance } from '../helpers/Helper';

function Map(props) {
  const [bins, setBins] = useState([]);
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
    binType: ['trash'],
    uploadTime: 'Not Available',
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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      // Can only get location if permission granted
      if (status !== 'granted') {
        console.log('LOCATION PERMISSIONS DENIED');
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
        const binsResp = await axios.post(`${backend_domain}/bins`, {
          latitude: region.latitude,
          longitude: region.longitude,
        });
        setBins(binsResp.data);
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
        {bins.map((item, index) => (
          <BinMarker
            key={index}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            type={item.binType}
            onPress={(e) => {
              setCameraRegion({
                latitude: item.latitude,
                longitude: item.longitude,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
              });

              setPressedBin({
                coordinate: {
                  latitude: item.latitude,
                  longitude: item.longitude,
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
            distance={calculateDistance(pressedBin.coordinate, {
              latitude: region.latitude,
              longitude: region.longitude,
            })}
          ></BinMarkerCallout>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height:
      Platform.OS === 'ios'
        ? Dimensions.get('window').height - 200
        : Dimensions.get('window').height - 132,
  },
  roundBorder: {
    borderRadius: 8,
  },
  float: {
    position: 'absolute',
    top:
      Platform.OS === 'ios'
        ? Dimensions.get('window').height - 360
        : Dimensions.get('window').height - 300,
  },
});

export default Map;
