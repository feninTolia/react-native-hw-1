import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, View, Pressable } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from './Button';

export default function CameraInterface({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();

        setImage(data.uri);
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        setImage(null);
        navigation.navigate('DefaultCreatePostScreen', { image });
      } catch (error) {
        console.warn(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Camera permissinos has not granted. Please change that on settings
        </Text>
      </View>
    );
  }

  return (
    <View style={s.container}>
      {!image ? (
        <Camera style={s.camera} type={type} flashMode={flash} ref={cameraRef}>
          <View style={s.flashReverseBtnsWrapper}>
            <Pressable
              style={s.button}
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            >
              <Text style={s.text}>🔄</Text>
            </Pressable>
            <Pressable
              style={{
                ...s.button,
                backgroundColor: flash ? 'red' : 'lightblue',
              }}
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            >
              <Text style={s.text}>⚡</Text>
            </Pressable>
          </View>
          <View style={s.shootingArea}></View>
        </Camera>
      ) : (
        <View style={s.takenPhotoWrapper}>
          <Image source={{ uri: image }} style={s.takenPhoto} />
        </View>
      )}

      <View>
        {image ? (
          <View style={s.saveRetakeBtnsWrapper}>
            <Pressable
              onPress={() => {
                setImage(null);
              }}
              style={s.button}
            >
              <Text style={s.text}>Retake</Text>
            </Pressable>
            <Pressable onPress={saveImage} style={s.button}>
              <Text style={s.text}>Save</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={takePicture}
            style={{ ...s.button, borderRadius: 0, paddingVertical: 32 }}
          >
            <Text style={s.text}>Take photo</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: { flex: 1 },
  shootingArea: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -120 }],

    width: '100%',
    height: 240,
    borderWidth: 5,

    borderStyle: 'dashed',
    borderColor: 'yellow',
  },
  flashReverseBtnsWrapper: {
    marginTop: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  takenPhotoWrapper: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: 'center',
  },
  takenPhoto: { height: 240, borderRadius: 8 },
  saveRetakeBtnsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 32,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: 'lightblue',
  },
  text: { fontSize: 18, fontFamily: 'Roboto-Medium' },
});
