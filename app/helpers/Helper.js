import * as Location from 'expo-location';

export const backend_domain = 'http://localhost:8000/';

export const _getLocation = async (locPermission) => {
  let { status } = await Location.requestPermissionsAsync();
  let loc = {
    location: {},
    errMsg: '',
  };

  // Can only get location if permission granted
  if (status !== 'granted') {
    loc.errMsg = 'LOCATION PERMISSIONS DENIED';
  } else {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    loc.location = location;
  }
  return loc;
};
