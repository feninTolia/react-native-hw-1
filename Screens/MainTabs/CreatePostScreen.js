import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const initialFormState = {
  title: '',
  location: '',
};

export default function CommentsScreen({ navigation, test }) {
  const [formValues, setFormValues] = useState(initialFormState);

  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // console.log(navigation);
  const onBackgroundPress = () => {
    Keyboard.dismiss();
    setKeyboardIsOpen(false);
  };

  const handleSubmit = () => {
    if (formValues.location && formValues.title) {
      setKeyboardIsOpen(false);
      setFormValues(initialFormState);
      navigation.navigate('PostsScreen');
    }
  };

  console.log(test);

  return (
    <View
      style={{
        ...styles.container,
        marginTop: keyboardIsOpen ? -150 : 0,
      }}
    >
      <Pressable onPress={onBackgroundPress} style={{ width: '100%' }}>
        <Pressable
          onPress={() => {
            navigation.navigate('CameraTest');
          }}
        >
          <View
            style={{
              width: '100%',
              height: 240,
              backgroundColor: '#F6F6F6',
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#fff',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={require('../../assets/camera-black.png')}
                style={{ width: 24, height: 24 }}
              />
            </View>
          </View>
        </Pressable>
        <Text
          style={{
            marginTop: 8,
            marginBottom: 32,
            color: '#BDBDBD',
            fontSize: 16,
          }}
          onPress={() => {
            navigation.navigate('CameraTest');
          }}
        >
          Download photo
        </Text>
        <View>
          <TextInput
            placeholder="Title..."
            style={{ ...styles.input }}
            value={formValues.title}
            onChangeText={(newValue) =>
              setFormValues((prev) => ({ ...prev, title: newValue }))
            }
            onFocus={() => setKeyboardIsOpen(true)}
          ></TextInput>
          <TextInput
            placeholder="Location..."
            style={styles.input}
            value={formValues.location}
            onChangeText={(newValue) =>
              setFormValues((prev) => ({ ...prev, location: newValue }))
            }
            onFocus={() => setKeyboardIsOpen(true)}
          ></TextInput>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.submitButton,
            {
              backgroundColor:
                pressed && formValues.location && formValues.title
                  ? 'rgb(210, 230, 255)'
                  : '#FF6C00',
            },
          ]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Publish</Text>
        </Pressable>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 32,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  text: { fontSize: 32, fontFamily: 'Roboto-Medium' },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    paddingVertical: 16,
    marginBottom: 16,

    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#212121',
  },
  submitButton: {
    paddingVertical: 16,
    marginTop: 32,
    borderRadius: '100px',
    backgroundColor: '#FF6C00',

    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Roboto-Regular',
  },
});
