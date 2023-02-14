import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function SingleComment() {
  return (
    <View style={s.container}>
      <Image source style={s.avatar} />
      <View style={s.commentBodyWrapper}>
        <Text>
          Comment about smth zfdzfdzfzdf zsdsdf sdfsdf weterg grerg erg erhet
          hfyj y
        </Text>
        <Text style={s.dateStamp}>16 June, 2020 | 09:37</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { width: '80%', flexDirection: 'row', marginBottom: 24 },
  avatar: {
    width: 28,
    height: 28,
    maxWidth: '15%',
    borderRadius: 50,
    backgroundColor: 'green',
    marginEnd: 16,
  },
  commentBodyWrapper: {
    backgroundColor: '#ececec',
    padding: 16,
    borderRadius: 6,
    borderTopStartRadius: 0,
  },
  dateStamp: { fontSize: 10, color: '#BDBDBD', marginTop: 8 },
});
