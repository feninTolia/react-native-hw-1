import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
  Dimensions,
  useWindowDimensions,
} from 'react-native';

const initialFormState = {
  email: '',
  password: '',
};

export default function LoginScreen({ navigation }) {
  const [formValues, setFormValues] = useState(initialFormState);

  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [isLastFieldFocused, setIsLastFieldFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [dimensions, setDimensions] = useState(Dimensions.get('window').width);
  const { _, width } = useWindowDimensions();

  useEffect(() => {
    setDimensions(width);
  }, [width]);

  const onBackgroundPress = () => {
    Keyboard.dismiss();
    setKeyboardIsOpen(false);
    setIsLastFieldFocused(false);
  };

  const handleSubmit = () => {
    if (formValues.email !== '' && formValues.password !== '') {
      console.log(formValues);
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
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Sign in</Text>
              </TouchableOpacity>
              <Text
                style={styles.linkToLogin}
                onPress={() => {
                  setKeyboardIsOpen(false);
                  setIsLastFieldFocused(false);
                  navigation.navigate('RegistrationScreen');
                }}
              >
                Do not have an account? Register
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
    paddingTop: 32,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingHorizontal: 16,
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
