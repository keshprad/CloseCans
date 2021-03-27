import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { View, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';

import BinMarker from './BinMarker';
import BinMarkerCallout from './BinMarkerCallout';

const bins = [
  {
    coordinates: {
      latitude: 37.30757699280724,
      longitude: -122.01661523830575,
    },
    bin_type: ['trash'],
    upload_time: 'Mar 15, 2021',
  },
  {
    coordinates: {
      latitude: 37.30787948833927,
      longitude: -122.01654157463312,
    },
    bin_type: ['recycling'],
    upload_time: 'Mar 15, 2021',
  },
  {
    coordinates: {
      latitude: 37.30802392271359,
      longitude: -122.01645420609117,
    },
    bin_type: ['compost'],
    upload_time: 'Mar 15, 2021',
  },
  {
    coordinates: {
      latitude: 37.30787948833927,
      longitude: -122.01645420609117,
    },
    bin_type: ['trash', 'recycling'],
    upload_time: 'Mar 15, 2021',
  },
];

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
          }
        );
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        {bins.map((item, index) => (
          <BinMarker
            key={index}
            coordinate={item.coordinates}
            type={item.bin_type}
            onPress={onMarkerPress}
          ></BinMarker>
        ))}
      </MapView>
      <BinMarkerCallout style={styles.popup}></BinMarkerCallout>
    </View>
  );
}

function onMarkerPress() {
  console.log(0);
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
    height: Dimensions.get('window').height,
  },
});

export default Map;
