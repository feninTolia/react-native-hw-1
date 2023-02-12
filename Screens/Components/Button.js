import * as react from 'react';
import { Text, Pressable, StyleSheet, Image } from 'react-native';

export default function Button({ title, onPress, icon, color }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        {
          backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#FF6C00',
        },
      ]}
    >
      <Image source={icon} />
      <Text style={s.text}>{title}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  button: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  text: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#212121',
  },
});
