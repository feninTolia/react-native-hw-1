import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          paddingVertical: 32,
        }}
      >
        <Image
          source={require('../../assets/regBG.jpeg')}
          style={{ width: 60, height: 60, borderRadius: 16 }}
        />
        <View style={{ justifyContent: 'center', marginLeft: 8 }}>
          <Text style={{ fontSize: 13, fontFamily: 'Roboto-Medium' }}>
            Anatolii Fenin
          </Text>
          <Text style={{ fontSize: 11, fontFamily: 'Roboto-Regular' }}>
            example@mail.com
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={{ marginHorizontal: 16, marginBottom: 32 }}>
          <Image
            source={require('../../assets/regBG.jpeg')}
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
                  source={require('../../assets/Shape.png')}
                  style={styles.postIcons}
                />
                <Text style={{ fontSize: 16 }}>8</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../assets/like.png')}
                  style={styles.postIcons}
                />
                <Text style={{ fontSize: 16 }}> 153</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../../assets/map-pin.png')}
                style={{ ...styles.postIcons, width: 24, height: 24 }}
              />
              <Text style={{ fontSize: 16, textDecorationLine: 'underline' }}>
                Ukraine
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginHorizontal: 16, marginBottom: 32 }}>
          <Image
            source={require('../../assets/regBG.jpeg')}
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
                  source={require('../../assets/Shape.png')}
                  style={styles.postIcons}
                />
                <Text style={{ fontSize: 16 }}>8</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../assets/like.png')}
                  style={styles.postIcons}
                />
                <Text style={{ fontSize: 16 }}> 153</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../../assets/map-pin.png')}
                style={{ ...styles.postIcons, width: 24, height: 24 }}
              />
              <Text style={{ fontSize: 16, textDecorationLine: 'underline' }}>
                Ukraine
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginHorizontal: 16, marginBottom: 32 }}>
          <Image
            source={require('../../assets/regBG.jpeg')}
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
                  source={require('../../assets/Shape.png')}
                  style={styles.postIcons}
                />
                <Text style={{ fontSize: 16 }}>8</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../assets/like.png')}
                  style={styles.postIcons}
                />
                <Text style={{ fontSize: 16 }}> 153</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../../assets/map-pin.png')}
                style={{ ...styles.postIcons, width: 24, height: 24 }}
              />
              <Text style={{ fontSize: 16, textDecorationLine: 'underline' }}>
                Ukraine
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: { fontSize: 32, fontFamily: 'Roboto-Medium' },
  postIcons: { width: 18, height: 18, marginRight: 8 },
});
