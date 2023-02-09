import React from 'react';
import { Link } from '@react-navigation/native';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function MyHeader({ title, navigation }) {
  return (
    <View style={styles?.container}>
      <Text style={styles.text}> {title}</Text>
      <Link
        to={{ screen: 'LoginScreen', params: { id: 'jane' } }}
        style={styles.logOut}
      >
        <Image
          source={require('../assets/log-out.png')}
          style={{ width: 24, height: 24 }}
        />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // height: 88,
    paddingTop: 55,
    paddingBottom: 11,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgrey',
  },
  text: { fontSize: 17, fontFamily: 'Roboto-Medium' },
  logOut: {
    position: 'absolute',
    height: 24,
    width: 24,
    bottom: 10,
    right: 16,
  },
});
