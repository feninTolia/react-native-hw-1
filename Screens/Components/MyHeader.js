import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { authSignOutUser } from '../redux/auth/authOperations';

export default function MyHeader({ title, goBack, logout }) {
  const dispatch = useDispatch();
  return (
    <View style={s.container}>
      {goBack && (
        <Pressable
          hitSlop={8}
          style={({ pressed }) => [
            s.goBackArrowBtn,
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'transparent',
            },
          ]}
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

      <Text style={s.text}> {title}</Text>
      {logout && (
        <Pressable
          style={({ pressed }) => [
            s.logOut,
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'transparent',
            },
          ]}
          onPress={() => {
            dispatch(authSignOutUser());
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

const s = StyleSheet.create({
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
    bottom: 4,
    right: 16,
    borderRadius: 10,
    padding: 8,
  },
  goBackArrowBtn: {
    position: 'absolute',
    left: 12,
    top: 50,
    borderRadius: 10,
    padding: 4,
  },
});
