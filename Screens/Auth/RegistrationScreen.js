import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { authSignUpUser } from '../redux/auth/authOperations';

import * as ImagePicker from 'expo-image-picker';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase/config';

const initialFormState = {
  nickname: '',
  email: '',
  password: '',
  photoURL: '',
};

export default function RegistrationScreen({ navigation }) {
  const [formValues, setFormValues] = useState(initialFormState);

  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [isLastFieldFocused, setIsLastFieldFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [avatarPhoto, setAvatarPhoto] = useState(null);

  const [dimensions, setDimensions] = useState(Dimensions.get('window').width);
  const { _, width } = useWindowDimensions();

  const dispatch = useDispatch();

  const uploadImageToServer = async () => {
    try {
      const response = await fetch(avatarPhoto);
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
      console.log(e);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setAvatarPhoto(result.assets[0].uri);
      const avatarPhotoURL = await uploadImageToServer();
      setFormValues((prev) => ({ ...prev, photoURL: avatarPhotoURL }));
    }
  };

  useEffect(() => {
    setDimensions(width);
  }, [width]);

  const onBackgroundPress = () => {
    Keyboard.dismiss();
    setKeyboardIsOpen(false);
    setIsLastFieldFocused(false);
  };

  const handleSubmit = () => {
    if (
      formValues.email !== '' &&
      formValues.nickname !== '' &&
      formValues.password !== ''
    ) {
      dispatch(authSignUpUser(formValues));
      Keyboard.dismiss();
      setKeyboardIsOpen(false);
      setIsLastFieldFocused(false);
      setFormValues(initialFormState);
    }
  };

  return (
    <View style={styles.container0}>
      <Pressable onPress={onBackgroundPress} style={{ width: '100%' }}>
        <ImageBackground
          source={require('../../assets/regBG.png')}
          style={styles.bgImg}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          >
            <View
              style={{
                ...styles.container,
                marginBottom: keyboardIsOpen ? -190 : 0,
                paddingBottom: isLastFieldFocused ? 170 : 80,
                // paddingHorizontal: dimensions > 600 ? 96 : 16,
              }}
            >
              <View style={styles.avatarWrapper}>
                <Image source={{ uri: avatarPhoto }} style={styles.avatar} />
                <Pressable
                  style={({ pressed }) => [
                    styles.addAvatarBtnWrapper,
                    {
                      transform: [{ scale: pressed ? 1.2 : 1 }],
                    },
                  ]}
                  onPress={pickImage}
                >
                  <Image
                    source={require('../../assets/add.png')}
                    style={styles.addAvatarBtn}
                  />
                </Pressable>
              </View>
              <Text style={styles.header}>Registration</Text>
              <View style={styles.wrapper}>
                <TextInput
                  placeholder="Login"
                  style={styles.input}
                  autoComplete="password"
                  value={formValues.nickname}
                  onChangeText={(newValue) =>
                    setFormValues((prev) => ({ ...prev, nickname: newValue }))
                  }
                  onFocus={() => {
                    setKeyboardIsOpen(true);
                    setIsLastFieldFocused(false);
                  }}
                />
              </View>
              <View style={styles.wrapper}>
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  value={formValues.email}
                  onChangeText={(newValue) =>
                    setFormValues((prev) => ({ ...prev, email: newValue }))
                  }
                  onFocus={() => {
                    setKeyboardIsOpen(true);
                    setIsLastFieldFocused(false);
                  }}
                />
              </View>
              <View style={styles.wrapper}>
                <TextInput
                  placeholder="Password"
                  style={styles.input}
                  secureTextEntry={isPasswordVisible ? false : true}
                  value={formValues.password}
                  onChangeText={(newValue) =>
                    setFormValues((prev) => ({ ...prev, password: newValue }))
                  }
                  onFocus={() => {
                    setIsLastFieldFocused(true), setKeyboardIsOpen(true);
                  }}
                />
                <TouchableOpacity
                  style={styles.showPassword}
                  onPress={() => setIsPasswordVisible((prev) => !prev)}
                >
                  <Text>{isPasswordVisible ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.button}
                activeOpacity="0.75"
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <Text
                style={styles.linkToLogin}
                onPress={() => {
                  setKeyboardIsOpen(false);
                  setIsLastFieldFocused(false);
                  navigation.navigate('LoginScreen');
                }}
              >
                Already have an account? Log in
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container0: {
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
  container: {
    backgroundColor: '#fff',
    paddingTop: 92,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingHorizontal: 16,
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    backgroundColor: 'pink',
    borderRadius: 16,
    position: 'absolute',
    top: -60,
    left: '50%',
    transform: [{ translateX: -60 }],
  },
  avatar: { width: 120, height: 120, borderRadius: 16 },
  addAvatarBtnWrapper: { position: 'absolute', right: -12.5, bottom: 14 },
  addAvatarBtn: {
    width: 25,
    height: 25,
  },
  header: {
    color: '#212121',
    fontSize: 30,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    marginBottom: 32,
  },
  wrapper: {
    width: '100%',
  },
  input: {
    height: 50,

    marginBottom: 16,
    paddingHorizontal: 16,

    fontFamily: 'Roboto-Regular',
    color: '#212121',
    fontSize: 16,
    backgroundColor: '#f6f6f6',

    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',
  },
  showPassword: {
    position: 'absolute',
    right: 32,
    top: 16,
  },
  showPasswordText: { color: '#216cc2', fontFamily: 'Roboto-Regular' },
  button: {
    height: 50,
    marginTop: 25,
    paddingHorizontal: 16,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'orange',

    borderRadius: 100,
  },
  buttonText: { color: '#fff', fontSize: 16, fontFamily: 'Roboto-Regular' },
  linkToLogin: {
    marginTop: 16,

    fontSize: 16,
    color: '#216cc2',
    textAlign: 'center',
  },
});
