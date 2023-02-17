import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';

export default function MapViewScreen({ route }) {
  if (route.params.mapNavigate === null) {
    alert('Your location was not detected.');
    return (
      <View style={styles.container}>
        <MapView style={styles.map} />
      </View>
    );
  }

  const { latitude, longitude } = route.params.mapNavigate;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: '0.001',
          longitudeDelta: '0.006',
        }}
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
