import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function App() {
  return (
    <>
      <ImageBackground
        source={require('../assets/regBG.png')}
        style={styles.bgImg}
      >
        <View style={styles.container}>
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
            />
          </View>
          <View style={styles.wrapper}>
            <TextInput placeholder="Email" style={styles.input} />
          </View>
          <View style={styles.wrapper}>
            <TextInput
              placeholder="Password"
              style={styles.input}
              autoComplete="password-new"
            />
            <Text style={styles.showPassword}>Show</Text>
          </View>
          <TouchableOpacity style={styles.button} activeOpacity="0.75">
            <Text style={{ color: '#fff', fontSize: 16 }}>Register</Text>
          </TouchableOpacity>
          <Text style={styles.linkToLogin}>
            Already have an account? Log in
          </Text>
        </View>
      </ImageBackground>
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
