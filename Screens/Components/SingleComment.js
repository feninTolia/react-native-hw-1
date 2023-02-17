import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function SingleComment({ title, date }) {
  return (
    <View style={s.container}>
      <Image source style={s.avatar} />
      <View style={s.commentBodyWrapper}>
        <Text>{title}</Text>
        <Text style={s.dateStamp}>
          {date ? new Date(date).toLocaleString() : ''}
        </Text>
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
