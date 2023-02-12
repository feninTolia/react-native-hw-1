import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from '../Components/Button';

export default function CameraTest() {
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
        console.log(data);
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
        alert('Picture saved!');
        setImage(null);
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
          <View
            style={{
              position: 'absolute',
              top: 32,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: 32,
            }}
          >
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              gap: 30,
            }}
          >
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
  },
  camera: { flex: 1 },
  takenPhoto: { flex: 1 },
});
