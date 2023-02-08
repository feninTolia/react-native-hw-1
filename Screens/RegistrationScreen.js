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

const initialFormState = {
  login: '',
  email: '',
  password: '',
};

export default function RegistrationScreen({ navigation }) {
  const [formValues, setFormValues] = useState(initialFormState);

  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [isLastFieldFocused, setIsLastFieldFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [dimensions, setDimensions] = useState(Dimensions.get('window').width);
  const { _, width } = useWindowDimensions();

  useEffect(() => {
    console.log(width);
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
      formValues.login !== '' &&
      formValues.password !== ''
    ) {
      console.log(formValues);
      setKeyboardIsOpen(false);
      setIsLastFieldFocused(false);
      setFormValues(initialFormState);
      navigation.navigate('HomeScreen');
    }
  };

  return (
    <View style={styles.container0}>
      <Pressable onPress={onBackgroundPress} style={{ width: '100%' }}>
        <ImageBackground
          source={require('../assets/regBG.png')}
          style={styles.bgImg}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View
              style={{
                ...styles.container,
                marginBottom: keyboardIsOpen && !isLastFieldFocused ? -180 : 0,
                paddingBottom: isLastFieldFocused ? 20 : 80,
                paddingHorizontal: dimensions > 600 ? 96 : 16,
              }}
            >
              <View style={styles.avatar}>
                <Image />
                <Image
                  source={require('../assets/add.png')}
                  style={styles.addAvatarBtn}
                />
              </View>
              <Text style={styles.header}>Registration</Text>
              <View style={styles.wrapper}>
                <TextInput
                  placeholder="Login"
                  style={styles.input}
                  autoComplete="password"
                  value={formValues.login}
                  onChangeText={(newValue) =>
                    setFormValues((prev) => ({ ...prev, login: newValue }))
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
                  onFocus={() => setIsLastFieldFocused(true)}
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
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
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
