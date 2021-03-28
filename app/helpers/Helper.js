import * as Location from 'expo-location';

export const backend_domain =
  // 'https://close-cans-service-o5ls7lw73a-uw.a.run.app';
  'http://localhost:8000';

export const calculateDistance = (coordinate1, coordinate2) => {
  const R = 6371e3; // metres
  const φ1 = (coordinate1.latitude * Math.PI) / 180; // φ, λ in radians
  const φ2 = (coordinate2.latitude * Math.PI) / 180;
  const Δφ = ((coordinate2.latitude - coordinate1.latitude) * Math.PI) / 180;
  const Δλ = ((coordinate2.longitude - coordinate1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres

  return (d * 3.28084).toFixed(1); // in feet rounded to 1 decimal place
};

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
