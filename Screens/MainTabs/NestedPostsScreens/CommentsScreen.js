import React, { useEffect, useState } from 'react';
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
  FlatList,
  Dimensions,
} from 'react-native';
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import SingleComment from '../../Components/SingleComment';

export default function CommentsScreen({ navigation, route }) {
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(null);
  const [commentValue, setCommentValue] = useState('');
  const [coments, setComents] = useState([]);
  const [vh, setVh] = useState(Dimensions.get('window').height);

  const { postId, imageUri } = route.params;

  const docRef = doc(db, 'posts', postId);
  const colRef = collection(docRef, 'comments');

  const createComment = async () => {
    try {
      await addDoc(colRef, {
        comment: commentValue,
        date: Date.now(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllComments = async () => {
    try {
      const unsub = onSnapshot(colRef, (snapshot) => {
        setComents(
          snapshot.docs.map((doc) => ({ ...doc.data(), commentId: doc.id }))
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllComments();

    return () => {
      // unsub();
    };
  }, []);

  const onBackgroundPress = () => {
    Keyboard.dismiss();
    setKeyboardIsOpen(false);
  };

  const handleSubmit = async () => {
    if (commentValue) {
      await createComment();
      setCommentValue('');
      onBackgroundPress();
    }
  };

  console.log(vh);
  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'position' : 'height'}
    //   style={{ flex: 1, backgroundColor: 'green' }}
    // >
    <View
      style={{
        ...s.container,
      }}
    >
      <Pressable onPress={onBackgroundPress}>
        <Image source={{ uri: imageUri }} style={s.image} />
      </Pressable>
      <FlatList
        // contentContainerStyle={{}}
        style={{ flex: 'auto' }}
        data={coments.sort((a, b) => new Date(b.date) - new Date(a.date))}
        keyExtractor={(item) => item.commentId}
        renderItem={({ item }) => (
          <SingleComment
            imageUri={item.photo}
            title={item.comment}
            date={item.date}
          />
        )}
      />
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
    </View>
    // </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 32,
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 240,
    backgroundColor: 'lightgray',
    borderRadius: 8,
    marginBottom: 32,
  },
  inputGroupWrapper: {
    width: '100%',
    marginTop: 16,
    paddingBottom: 64,
  },
  input: {
    width: '100%',
    height: 50,
    padding: 16,
    marginBottom: -32,

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
