import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DefaultPostsScreen from './NestedPostsScreens/DefaultPostsScreen';
import MapViewScreen from './NestedPostsScreens/MapViewScreen';
import CommentsScreen from './NestedPostsScreens/CommentsScreen';
import MyHeader from '../Components/MyHeader';

const NestedScreen = createStackNavigator();

export default function PostsScreen() {
  return (
    <NestedScreen.Navigator screenOptions={{ headerShown: true }}>
      <NestedScreen.Screen
        name="DefaultPostsScreen"
        component={DefaultPostsScreen}
        options={{
          header: ({ navigation, route, options }) => {
            return <MyHeader title={'Posts'} logout />;
          },
        }}
      />
      <NestedScreen.Screen
        name="MapViewScreen"
        component={MapViewScreen}
        options={{
          header: ({ navigation, route, options }) => {
            return <MyHeader title={'Map'} goBack={navigation.goBack} />;
          },
        }}
      />
      <NestedScreen.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          header: ({ navigation, route, options }) => {
            return <MyHeader title={'Posts'} goBack={navigation.goBack} />;
          },
        }}
      />
    </NestedScreen.Navigator>
  );
}
