import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CameraInterface from '../Components/CameraInterface';
import DefaultCreatePostScreen from './NestedCreatePostScreen/DefaultCreatePostScreen';
import MyHeader from '../Components/MyHeader';

const CreatePostStack = createStackNavigator();

export default function CreatePostScreen() {
  return (
    <CreatePostStack.Navigator>
      <CreatePostStack.Screen
        name="DefaultCreatePostScreen"
        component={DefaultCreatePostScreen}
        options={{
          header: ({ navigation, route, options }) => {
            return (
              <MyHeader title={'Create post'} goBack={navigation.goBack} />
            );
          },
        }}
      />
      <CreatePostStack.Screen
        name="CameraInterface"
        component={CameraInterface}
        options={{ headerShown: false }}
      />
    </CreatePostStack.Navigator>
  );
}
