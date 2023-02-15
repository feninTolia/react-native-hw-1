import React, { useState } from 'react';
import {
  View,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SingleComment from '../../Components/SingleComment';

export default function CommentsScreen({ navigation, route }) {
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(null);
  const [commentValue, setCommentValue] = useState('');

  const onBackgroundPress = () => {
    Keyboard.dismiss();
    setKeyboardIsOpen(false);
  };

  const handleSubmit = () => {
    if (commentValue) {
      console.log(commentValue);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Pressable onPress={onBackgroundPress} style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          style={{ ...s.container, marginTop: keyboardIsOpen ? -80 : 0 }}
        >
          <Image source={{ uri: route.params.imageUri }} style={s.image} />

          <SingleComment />
          <SingleComment />
          <SingleComment />

          <View style={s.inputGroupWrapper}>
            <TextInput
              style={{ ...s.input }}
              placeholder="Comment..."
              onFocus={() => {
                setKeyboardIsOpen(true);
              }}
              value={commentValue}
              onChangeText={(newValue) => setCommentValue(newValue)}
            />
            <Pressable
              style={({ pressed }) => [
                s.submitBtn,
                {
                  backgroundColor:
                    pressed && commentValue ? 'rgb(210, 230, 255)' : '#FF6C00',
                },
              ]}
              onPress={handleSubmit}
            >
              <Image
                source={require('../../../assets/arrowUp.png')}
                style={{ width: 10, height: 14 }}
              />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 32,
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: 'green',
  },
  image: {
    width: '100%',
    height: 240,
    backgroundColor: 'lightgray',
    borderRadius: 8,
    marginBottom: 32,
  },
  inputGroupWrapper: {
    // position: 'absolute',
    width: '100%',
    marginTop: 16,
    backgroundColor: 'red',
    marginBottom: 32,
    // bottom: 0,
  },
  input: {
    width: '100%',
    height: 50,
    padding: 16,

    fontSize: 16,
    fontFamily: 'Roboto-Regular',

    backgroundColor: '#E8E8E8',
    borderRadius: 100,
  },

  submitBtn: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: '#FF6C00',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
