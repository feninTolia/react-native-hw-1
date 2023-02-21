import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import { useSelector } from 'react-redux';
import { db } from '../../../firebase/config';

import Post from '../../Components/Post';

const colRef = collection(db, 'posts');

export default function DefaultPostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  const { nickname, email, photoURL } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsub = onSnapshot(colRef, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id })));
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <View style={s.container}>
      <Pressable
        style={s.creditsWrapper}
        onPress={() => {
          navigation.navigate('ProfileScreen');
        }}
      >
        <Image source={{ uri: photoURL }} style={s.avatar} />
        <View style={s.creditsInnerTextWrapper}>
          <Text style={s.name}>{nickname}</Text>
          <Text style={s.email}>{email}</Text>
        </View>
      </Pressable>

      <FlatList
        data={posts.sort((a, b) => new Date(b.date) - new Date(a.date))}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <Post
            imageUri={item.photo}
            title={item.title}
            location={item.location}
            mapNavigate={item.locationCoords}
            postId={item.postId}
            likesAmount={item.likesAmount}
            commentsAmount={item.commentsAmount}
          />
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  creditsWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'purple',
  },
  creditsInnerTextWrapper: { justifyContent: 'center', marginLeft: 8 },
  name: { fontSize: 13, fontFamily: 'Roboto-Medium' },
  email: { fontSize: 11, fontFamily: 'Roboto-Regular' },
});
