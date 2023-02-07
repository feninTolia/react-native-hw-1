import { useEffect, useRef, useState } from 'react';
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
  Animated,
  Dimensions,
  useWindowDimensions,
} from 'react-native';

const initialFormState = {
  email: '',
  password: '',
};

export default function App() {
  const [formValues, setFormValues] = useState(initialFormState);

  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [isLastFieldFocused, setIsLastFieldFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [dimensions, setDimensions] = useState(Dimensions.get('window').width);

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    setDimensions(width);
  }, [width]);

  const onBackgroundPress = () => {
    Keyboard.dismiss();
    setKeyboardIsOpen(false);
    setIsLastFieldFocused(false);
  };

  return (
    <>
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
                marginBottom: keyboardIsOpen && !isLastFieldFocused ? -240 : 0,
                paddingBottom: isLastFieldFocused ? 20 : 145,
                paddingHorizontal: dimensions > 600 ? 96 : 16,
              }}
            >
              <Text style={styles.header}>Sign in</Text>

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
                  <Text style={styles.showPasswordText}>
                    {isPasswordVisible ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.button}
                activeOpacity="0.75"
                onPress={() => {
                  if (formValues.email !== '' && formValues.password !== '') {
                    console.log(formValues);
                    setFormValues(initialFormState);
                  }
                }}
              >
                <Text style={{ color: '#fff', fontSize: 16 }}>Sign in</Text>
              </TouchableOpacity>
              <Text style={styles.linkToLogin}>
                Do not have an account? Register
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
    paddingTop: 32,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingHorizontal: 16,
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
    top: 16,
  },
  showPasswordText: { color: '#216cc2' },
  button: {
    height: 50,
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
