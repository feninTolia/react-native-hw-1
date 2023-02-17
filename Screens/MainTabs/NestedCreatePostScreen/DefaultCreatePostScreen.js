import React, { useState, useEffect } from 'react';
import {
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  SafeAreaView,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as Location from 'expo-location';

import { db, storage } from '../../../firebase/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { useSelector } from 'react-redux';

const initialFormState = {
  title: '',
  location: '',
  date: null,
};

export default function CommentsScreen({ navigation, route }) {
  const [formValues, setFormValues] = useState(initialFormState);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [cameraImage, setCameraImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState('');

  const { userID, nickname } = useSelector((state) => state.auth);

  useEffect(() => {
    if (route.params?.image) {
      setCameraImage(route.params?.image);
      setFormValues((prev) => ({ ...prev, date: new Date().toISOString() }));
    }

    return () => {};
  }, [route]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(status.toString());

      if (hasLocationPermission === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }

      if (hasLocationPermission === 'denied') {
        alert('Location permission is denied, change that in settings');
      }
    })();
  }, [hasLocationPermission]);

  const onBackgroundPress = () => {
    Keyboard.dismiss();
    setKeyboardIsOpen(false);
  };

  const uploadImageToServer = async () => {
    const response = await fetch(cameraImage);
    const file = await response.blob();

    const uniquePostID = Date.now().toString();
    const pathReference = ref(storage, `postImage/${uniquePostID}`);

    await uploadBytes(pathReference, file).catch((e) => console.log(e.message));
    const processedPhoto = await getDownloadURL(pathReference)
      .then((url) => {
        return url;
      })
      .catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            console.log('File does not exist');
            break;
          case 'storage/unauthorized':
            console.log(`User doesn't have permission to access the object`);
            break;
          case 'storage/canceled':
            console.log(`User canceled the upload`);
            break;
          case 'storage/unknown':
            console.log(`Unknown error occurred, inspect the server response`);
            break;
        }
      });

    return processedPhoto;
  };

  const uploadPostToServer = async () => {
    try {
      const photo = await uploadImageToServer();
      const createPost = await addDoc(collection(db, 'posts'), {
        userID,
        nickname,
        date: formValues.date,
        photo,
        title: formValues.title,
        location: formValues.location,
        locationCoords: location.coords,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    if (formValues.location && formValues.title && cameraImage) {
      uploadPostToServer();
      navigation.navigate('DefaultPostsScreen', {
        cameraImage,
        formValues,
        location,
      });
      setFormValues(initialFormState);
      setKeyboardIsOpen(false);
    }
  };

  const handleFormClean = () => {
    setFormValues(initialFormState);
    setCameraImage(null);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Pressable onPress={onBackgroundPress} style={s.tapToCloseKeyboardZone}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          style={{
            ...s.container,
            paddingTop: keyboardIsOpen ? 70 : 0,
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate('CameraInterface');
            }}
          >
            <View style={s.postImagePreviewWrapper}>
              <Image source={{ uri: cameraImage }} style={s.postImagePreview} />
              <View>
                <View
                  style={{
                    ...s.cameraIconBG,
                    opacity: cameraImage ? 0.3 : 1,
                  }}
                />
                <Image
                  source={
                    cameraImage
                      ? require('../../../assets/camera-white.png')
                      : require('../../../assets/camera-black.png')
                  }
                  style={s.cameraIcon}
                />
              </View>
            </View>
          </Pressable>
          <Text
            style={s.downloadPhotoBtnText}
            onPress={() => {
              navigation.navigate('CameraInterface');
            }}
          >
            {cameraImage ? 'Retake photo' : ' Download photo'}
          </Text>
          <View>
            <TextInput
              placeholder="Title..."
              style={s.input}
              value={formValues.title}
              onChangeText={(newValue) =>
                setFormValues((prev) => ({
                  ...prev,
                  title: newValue,
                }))
              }
              onFocus={() => setKeyboardIsOpen(true)}
            ></TextInput>
            <TextInput
              placeholder="Location..."
              style={s.input}
              value={formValues.location}
              onChangeText={(newValue) =>
                setFormValues((prev) => ({ ...prev, location: newValue }))
              }
              onFocus={() => setKeyboardIsOpen(true)}
            ></TextInput>
          </View>
          <Pressable
            style={({ pressed }) => [
              s.submitButton,
              {
                backgroundColor:
                  formValues.location && formValues.title && cameraImage
                    ? '#FF6C00'
                    : '#F6F6F6',
              },
            ]}
            onPress={handleSubmit}
          >
            <Text
              style={{
                ...s.submitButtonText,
                color:
                  formValues.location && formValues.title && cameraImage
                    ? '#fff'
                    : '#BDBDBD',
              }}
            >
              Publish
            </Text>
          </Pressable>
          <Pressable style={s.trashButton} onPress={handleFormClean}>
            <Image
              source={require('../../../assets/trash-2.png')}
              style={s.trashButtonIcon}
            />
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 32,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  tapToCloseKeyboardZone: { width: '100%', flex: 1 },
  postImagePreviewWrapper: {
    width: '100%',
    height: 240,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postImagePreview: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 8,
  },
  cameraIconBG: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    width: 24,
    height: 24,
    opacity: 1,
    position: 'absolute',
    top: 18,
    left: 18,
  },
  downloadPhotoBtnText: {
    marginTop: 8,
    marginBottom: 32,
    color: '#BDBDBD',
    fontSize: 16,
  },
  // text: { fontSize: 32, fontFamily: 'Roboto-Medium' },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    paddingVertical: 16,
    marginBottom: 16,

    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#212121',
  },
  submitButton: {
    paddingVertical: 16,
    marginTop: 32,
    borderRadius: '100px',
    backgroundColor: '#FF6C00',

    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Roboto-Regular',
  },
  trashButton: {
    position: 'absolute',
    bottom: -150, //temporaraly
    right: '50%',
    transform: [{ translateX: 35 }],

    alignItems: 'center',
    justifyContent: 'center',

    width: 70,
    height: 40,

    backgroundColor: '#F6F6F6',
    borderRadius: 20,
  },
  trashButtonIcon: { width: 24, height: 24 },
});
