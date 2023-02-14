import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default function TabBarIcon({
  focused,
  size,
  focusedIcon,
  unFocusedIcon,
}) {
  return (
    <View
      style={{
        ...styles.tabIconLayout,
        backgroundColor: focused ? '#FF6C00' : 'transparent',
      }}
    >
      <Image
        source={focused ? focusedIcon : unFocusedIcon}
        style={{
          width: size,
          height: size,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabIconLayout: {
    width: 70,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});
