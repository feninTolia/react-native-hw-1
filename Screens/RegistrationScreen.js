import { useState } from 'react';
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
} from 'react-native';

const initialFormState = {
  login: '',
  email: '',
  password: '',
};

export default function App() {
  const [formValues, setFormValues] = useState(initialFormState);

  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [test, setTest] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onPress = () => {
    Keyboard.dismiss();
    setKeyboardIsOpen(false);
    setTest(false);
  };

  return (
    <>
      <Pressable onPress={onPress} style={{ width: '100%' }}>
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
                marginBottom: keyboardIsOpen && !test ? -180 : 0,
                paddingBottom: test ? 20 : 80,
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
                    setTest(false);
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
                    setTest(false);
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
                  onFocus={() => setTest(true)}
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
                onPress={() => {
                  if (
                    formValues.email !== '' &&
                    formValues.login !== '' &&
                    formValues.password !== ''
                  ) {
                    console.log(formValues);
                    setFormValues(initialFormState);
                  }
                }}
              >
                <Text style={{ color: '#fff', fontSize: 16 }}>Register</Text>
              </TouchableOpacity>
              <Text style={styles.linkToLogin}>
                Already have an account? Log in
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  bgImg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    paddingBottom: 80,
    paddingTop: 92,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
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
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 32,
  },
  wrapper: {
    width: '100%',
  },
  input: {
    height: 50,

    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    paddingHorizontal: 16,

    color: '#bdbdbd',
    fontSize: 16,
    backgroundColor: '#f6f6f6',

    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',
  },
  showPassword: {
    position: 'absolute',
    right: 32,
    color: '#216cc2',
    top: 16,
  },
  button: {
    // width: '100%',
    height: 50,
    marginHorizontal: 16,
    marginTop: 25,
    paddingHorizontal: 16,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'orange',

    borderRadius: 100,
  },
  linkToLogin: {
    marginTop: 16,

    fontSize: 16,
    color: '#216cc2',
    textAlign: 'center',
  },
});
