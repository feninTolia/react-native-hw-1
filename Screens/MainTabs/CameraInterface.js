import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from '../Components/Button';

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
        navigation.navigate('CreatePost', { image });
      } catch (error) {
        console.warn(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return (
      <View>
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
            <Button
              title={'🔄'}
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <Button
              title={'⚡'}
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={s.takenPhoto} />
      )}

      <View>
        {image ? (
          <View style={s.saveRetakeBtnsWrapper}>
            <Button
              title={'Re-take'}
              onPress={() => {
                setImage(null);
              }}
            />
            <Button title={'Save'} onPress={saveImage} />
          </View>
        ) : (
          <Button title="TakePhoto" onPress={takePicture} />
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 128,
  },
  camera: { height: 240 },
  flashReverseBtnsWrapper: {
    marginTop: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  takenPhoto: { flex: 1 },
  saveRetakeBtnsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 30,
  },
});
