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
import { db, storage } from '../../firebase/config';

import Post from '../Components/Post';
import { useDispatch, useSelector } from 'react-redux';
import {
  authSignOutUser,
  updateUserAvatar,
} from '../redux/auth/authOperations';
import { NavigationContext } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const postsRef = collection(db, 'posts');

export default function ProfileScreen() {
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState(null);
  const { userID, nickname } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { photoURL } = useSelector((state) => state.auth);

  const uploadImageToServer = async () => {
    try {
      const response = await fetch(image);
      const file = await response.blob();

      const uniquePostID = Date.now().toString();
      const pathReference = ref(storage, `avatarImage/${uniquePostID}`);

      await uploadBytes(pathReference, file).catch((e) => console.log(e));

      const processedPhoto = await getDownloadURL(pathReference)
        .then((url) => {
          return url;
        })
        .catch((e) => {
          console.log(e);
        });

      return processedPhoto;
    } catch (e) {
      console.log(e.code);
      console.log(e.message);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const avatarPhotoURL = await uploadImageToServer();
      dispatch(updateUserAvatar(avatarPhotoURL)); //image => avatarPhotoURL
    }
  };

  const navigation = React.useContext(NavigationContext);

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
        {/* <ScrollView> */}
        <View style={s.wrapper}>
          <View style={s.avatar}>
            <Image
              source={{ uri: image }}
              style={{ width: 120, height: 120, borderRadius: 16 }}
            />

            <Pressable
              style={({ pressed }) => [
                s.addAvatarBtnWrapper,
                {
                  transform: [{ scale: pressed ? 1.2 : 1 }],
                },
              ]}
              onPress={() => {
                console.log('adding new avatar photo');
                pickImage();
                // navigation.navigate('CameraInterface');
                // navigation.navigate('CreatePostScreen', {
                //   screen: 'CameraInterface',
                //   params: { addProfilePhoto: true },
                // });
              }}
            >
              <Image
                source={require('../../assets/add.png')}
                style={s.addAvatarBtn}
              />
            </Pressable>
          </View>

          <Pressable
            style={({ pressed }) => [
              s.logOut,
              {
                backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'transparent',
              },
            ]}
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
                commentsAmount={item.commentsAmount}
              />
            )}
          />
        </View>
        {/* </ScrollView> */}
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
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
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
    width: 25,
    height: 25,
  },
  addAvatarBtnWrapper: { position: 'absolute', right: -12.5, bottom: 14 },
  logOut: {
    position: 'absolute',
    right: 16,
    top: 16,
    borderRadius: 15,
    padding: 8,
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
