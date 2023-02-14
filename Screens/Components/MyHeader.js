import React from 'react';
import { Link } from '@react-navigation/native';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';

export default function MyHeader({ title, goBack, logout }) {
  return (
    <View style={styles?.container}>
      {goBack && (
        <Pressable
          style={{ position: 'absolute', left: 16, top: 54 }}
          onPress={() => {
            goBack();
          }}
        >
          <Image
            source={require('../../assets/arrow-left.png')}
            style={{ width: 24, height: 24 }}
          />
        </Pressable>
      )}

      <Text style={styles.text}> {title}</Text>
      {logout && (
        <Pressable
          // to={{ screen: 'LoginScreen', params: { id: 'jane' } }}
          style={styles.logOut}
          onPress={() => {
            console.log('logout via redux');
          }}
        >
          <Image
            source={require('../../assets/log-out.png')}
            style={{ width: 24, height: 24 }}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
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
