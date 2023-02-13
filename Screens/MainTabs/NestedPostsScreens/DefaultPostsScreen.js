import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import Post from '../../Components/Post';

export default function DefaultPostsScreen({ route }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={s.container}>
      <View style={s.creditsWrapper}>
        <Image
          source={require('../../../assets/regBG.jpeg')}
          style={s.avatar}
        />
        <View style={s.creditsInnerTextWrapper}>
          <Text style={s.name}>Anatolii Fenin</Text>
          <Text style={s.email}>example@mail.com</Text>
        </View>
      </View>

      <FlatList
        data={posts.sort(
          (a, b) => new Date(b.formValues.date) - new Date(a.formValues.date)
        )}
        keyExtractor={(item) => item.formValues.date}
        renderItem={({ item }) => (
          <Post
            imageUri={item.cameraImage}
            title={item.formValues.title}
            location={item.formValues.location}
            mapNavigate={item.location}
          />
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  creditsWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  avatar: { width: 60, height: 60, borderRadius: 16 },
  creditsInnerTextWrapper: { justifyContent: 'center', marginLeft: 8 },
  name: { fontSize: 13, fontFamily: 'Roboto-Medium' },
  email: { fontSize: 11, fontFamily: 'Roboto-Regular' },
});
