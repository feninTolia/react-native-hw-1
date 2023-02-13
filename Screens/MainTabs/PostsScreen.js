import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DefaultPostsScreen from './NestedPostsScreens/DefaultPostsScreen';
import MapViewScreen from './NestedPostsScreens/MapViewScreen';
import CommentsScreen from './CreatePostScreen';

const NestedScreen = createStackNavigator();

export default function PostsScreen() {
  return (
    <NestedScreen.Navigator screenOptions={{ headerShown: false }}>
      <NestedScreen.Screen
        name="DefaultPostsScreen"
        component={DefaultPostsScreen}
      />
      <NestedScreen.Screen name="MapViewScreen" component={MapViewScreen} />
      <NestedScreen.Screen name="CommentsScreen" component={CommentsScreen} />
    </NestedScreen.Navigator>
  );
}
