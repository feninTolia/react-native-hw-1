import { Link } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Post({
  imageUri,
  title = 'some text',
  location = 'somewhere',
  mapNavigate,
}) {
  return (
    <View style={s.container}>
      <Image source={{ uri: imageUri }} style={s.mainImage} />
      <Text style={s.title}>{title}</Text>
      <View style={s.iconsWrapper}>
        <View style={{ flexDirection: 'row' }}>
          <View style={s.commentsWrapper}>
            <Image
              source={require('../../assets/Shape.png')}
              style={s.postIcons}
            />
            <Text style={s.iconsText}>8</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../../assets/like.png')}
              style={s.postIcons}
            />
            <Text style={s.iconsText}> 153</Text>
          </View>
        </View>
        <Link to={{ screen: 'MapViewScreen', params: { mapNavigate } }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../../assets/map-pin.png')}
              style={{ ...s.postIcons, width: 24, height: 24 }}
            />
            <Text style={{ ...s.iconsText, textDecorationLine: 'underline' }}>
              {location}
            </Text>
          </View>
        </Link>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { marginHorizontal: 16, marginBottom: 32 },
  postIcons: { width: 18, height: 18, marginRight: 8 },
  mainImage: {
    borderRadius: 8,
    height: 240,
    width: 'auto',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    paddingVertical: 8,
  },
  iconsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 27,
  },
  iconsText: { fontSize: 16, fontFamily: 'Roboto-Regular' },
});
