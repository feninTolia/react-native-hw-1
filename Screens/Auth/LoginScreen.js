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
  SafeAreaView,
} from 'react-native';

const initialFormState = {
  email: '',
  password: '',
};

export default function LoginScreen({ navigation }) {
  const [formValues, setFormValues] = useState(initialFormState);

  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [dimensions, setDimensions] = useState(Dimensions.get('window').width);
  const { _, width } = useWindowDimensions();

  useEffect(() => {
    setDimensions(width);
  }, [width]);

  const onBackgroundPress = () => {
    Keyboard.dismiss();
    setKeyboardIsOpen(false);
  };

  const handleSubmit = () => {
    if (formValues.email !== '' && formValues.password !== '') {
      console.log(formValues);
      Keyboard.dismiss();
      setKeyboardIsOpen(false);

      setFormValues(initialFormState);
    }
  };

  return (
    <Pressable
      onPress={onBackgroundPress}
      style={styles.container}
      // style={{ width: '100%', height: '100%', backgroundColor: 'blue' }}
    >
      <ImageBackground
        source={require('../../assets/regBG.png')}
        style={styles.bgImg}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        >
          <View
            style={{
              ...styles.formWrapper,
              // marginTop: keyboardIsOpen ? -240 : 0,
              paddingBottom: keyboardIsOpen ? 20 : 145,
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
                onFocus={() => setKeyboardIsOpen(true)}
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
                // navigation.navigate('RegistrationScreen');
              }}
            >
              Do not have an account? Register
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  formWrapper: {
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
