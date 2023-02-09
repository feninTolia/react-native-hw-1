import React from 'react';
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
  ScrollView,
} from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container0}>
      <ImageBackground
        source={require('../assets/regBG.png')}
        style={styles.bgImg}
      >
        <ScrollView>
          <View
            style={{
              ...styles.container,
            }}
          >
            <View style={styles.avatar}>
              <Image />
              <Image
                source={require('../assets/add.png')}
                style={styles.addAvatarBtn}
              />
            </View>
            <Text style={styles.header}>Anatolii Fenin</Text>

            <View style={{ marginHorizontal: 16, marginBottom: 32 }}>
              <Image
                source={require('../assets/regBG.jpeg')}
                style={{
                  borderRadius: 8,
                  height: 240,
                  width: 'auto',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Roboto-Medium',
                  paddingVertical: 8,
                }}
              >
                Forest
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginRight: 27,
                    }}
                  >
                    <Image
                      source={require('../assets/Shape.png')}
                      style={styles.postIcons}
                    />
                    <Text style={{ fontSize: 16 }}>8</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={require('../assets/like.png')}
                      style={styles.postIcons}
                    />
                    <Text style={{ fontSize: 16 }}> 153</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../assets/map-pin.png')}
                    style={{ ...styles.postIcons, width: 24, height: 24 }}
                  />
                  <Text
                    style={{ fontSize: 16, textDecorationLine: 'underline' }}
                  >
                    Ukraine
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginHorizontal: 16, marginBottom: 32 }}>
              <Image
                source={require('../assets/regBG.jpeg')}
                style={{
                  borderRadius: 8,
                  height: 240,
                  width: 'auto',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Roboto-Medium',
                  paddingVertical: 8,
                }}
              >
                Forest
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginRight: 27,
                    }}
                  >
                    <Image
                      source={require('../assets/Shape.png')}
                      style={styles.postIcons}
                    />
                    <Text style={{ fontSize: 16 }}>8</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={require('../assets/like.png')}
                      style={styles.postIcons}
                    />
                    <Text style={{ fontSize: 16 }}> 153</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../assets/map-pin.png')}
                    style={{ ...styles.postIcons, width: 24, height: 24 }}
                  />
                  <Text
                    style={{ fontSize: 16, textDecorationLine: 'underline' }}
                  >
                    Ukraine
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginHorizontal: 16, marginBottom: 32 }}>
              <Image
                source={require('../assets/regBG.jpeg')}
                style={{
                  borderRadius: 8,
                  height: 240,
                  width: 'auto',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Roboto-Medium',
                  paddingVertical: 8,
                }}
              >
                Forest
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginRight: 27,
                    }}
                  >
                    <Image
                      source={require('../assets/Shape.png')}
                      style={styles.postIcons}
                    />
                    <Text style={{ fontSize: 16 }}>8</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={require('../assets/like.png')}
                      style={styles.postIcons}
                    />
                    <Text style={{ fontSize: 16 }}> 153</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../assets/map-pin.png')}
                    style={{ ...styles.postIcons, width: 24, height: 24 }}
                  />
                  <Text
                    style={{ fontSize: 16, textDecorationLine: 'underline' }}
                  >
                    Ukraine
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
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
    marginTop: 200,
    backgroundColor: '#fff',
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
    color: '#212121',
    fontSize: 30,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    marginBottom: 32,
  },

  postIcons: { width: 18, height: 18, marginRight: 8 },
});
