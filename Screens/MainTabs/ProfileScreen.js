import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';

import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase/config';

import Post from '../Components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { authSignOutUser } from '../redux/auth/authOperations';

const postsRef = collection(db, 'posts');
const userID = `zabQhUFmJAheFE5XvuBaseTbuDn1`;

export default function ProfileScreen() {
  const [posts, setPosts] = useState([]);
  const { userID, nickname } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getUserPosts = async () => {
    try {
      const q = query(postsRef, where('userID', '==', userID));
      const unsub = onSnapshot(q, (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ ...doc.data(), postId: doc.id }))
        );
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={s.container}>
      <ImageBackground
        source={require('../../assets/regBG.png')}
        style={s.bgImg}
      >
        <ScrollView>
          <View style={s.wrapper}>
            <View style={s.avatar}>
              <Image />
              <Image
                source={require('../../assets/add.png')}
                style={s.addAvatarBtn}
              />
            </View>

            <Pressable
              style={s.logOut}
              onPress={() => {
                console.log('logout via redux');
                dispatch(authSignOutUser());
              }}
            >
              <Image
                source={require('../../assets/log-out.png')}
                style={s.logOutIcon}
              />
            </Pressable>
            <Text style={s.header}>{nickname}</Text>

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
                />
              )}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  wrapper: {
    marginTop: 200,
    backgroundColor: '#fff',
    paddingTop: 92,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: 'pink',
    borderRadius: 16,
    position: 'absolute',
    top: -60,
    left: '50%',
    transform: [{ translateX: -60 }],
  },
  addAvatarBtn: {
    position: 'absolute',
    width: 25,
    height: 25,
    right: -12.5,
    bottom: 14,
  },
  logOut: {
    position: 'absolute',
    right: 16,
    top: 22,
  },
  logOutIcon: { width: 24, height: 24 },
  header: {
    color: '#212121',
    fontSize: 30,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    marginBottom: 32,
  },

  postIcons: { width: 18, height: 18, marginRight: 8 },
});
