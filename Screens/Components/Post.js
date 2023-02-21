import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function Post({
  imageUri,
  title = 'some text',
  location = 'somewhere',
  mapNavigate,
  postId,
  commentsAmount = 0,
  likesAmount = 0,
}) {
  const [liked, setLiked] = useState(false);
  const navigation = React.useContext(NavigationContext);

  const postRef = doc(db, 'posts', postId);

  const onPostLike = async () => {
    setLiked(!liked);

    if (!liked) {
      await updateDoc(postRef, {
        likesAmount: likesAmount + 1,
      });

      return;
    }

    await updateDoc(postRef, {
      likesAmount: likesAmount - 1,
    });
  };

  return (
    <View style={s.container}>
      <Image source={{ uri: imageUri }} style={s.mainImage} />
      <Text style={s.title}>{title}</Text>

      <View style={s.iconsWrapper}>
        <Pressable
          hitSlop={8}
          style={({ pressed }) => [
            s.commentsWrapper,
            { backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'transparent' },
          ]}
          onPress={() => {
            navigation.navigate('CommentsScreen', { imageUri, postId });
          }}
        >
          <Image
            source={require('../../assets/Shape.png')}
            style={s.commentIcon}
          />
          <Text style={s.iconsText}>{commentsAmount}</Text>
        </Pressable>

        <Pressable
          style={{
            ...s.likesWrapper,
            padding: 8,
            borderRadius: 10,
            backgroundColor: liked ? 'rgb(210, 230, 255)' : 'transparent',
          }}
          onPress={onPostLike}
        >
          <Image
            source={require('../../assets/like.png')}
            style={s.postIcons}
          />
          <Text style={s.iconsText}>{likesAmount}</Text>
        </Pressable>

        <Pressable
          hitSlop={8}
          style={s.locationWrapper}
          onPress={() => {
            navigation.navigate('MapViewScreen', { mapNavigate });
          }}
        >
          <Image
            source={require('../../assets/map-pin.png')}
            style={{ ...s.postIcons, width: 24, height: 24 }}
          />
          <Text style={{ ...s.iconsText, textDecorationLine: 'underline' }}>
            {location}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { marginHorizontal: 16, marginBottom: 32 },

  mainImage: {
    borderRadius: 8,
    height: 240,
    width: 'auto',
    backgroundColor: 'green',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    paddingVertical: 8,
  },
  iconsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentsWrapper: {
    flexDirection: 'row',
    marginRight: 27,
    padding: 8,
    borderRadius: 10,
  },
  likesWrapper: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 8,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  locationLink: {},

  likesWrapper: { flexDirection: 'row', alignItems: 'center' },

  commentIcon: { width: 20, height: 20, marginRight: 8 },
  postIcons: { width: 20, height: 19, marginRight: 8 },

  iconsText: { fontSize: 16, fontFamily: 'Roboto-Regular' },
});
