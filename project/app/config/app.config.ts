export const APP_CONFIG = {
  defaultLocation: {
    latitude: 40.7128,
    longitude: -74.0060,
    zoom: 14
  },
  map: {
    minZoom: 10,
    maxZoom: 18,
    style: 'mapbox://styles/mapbox/streets-v11'
  },
  geolocation: {
    desiredAccuracy: 3,
    updateDistance: 10,
    updateInterval: 60000 // 1 minute
  }
};