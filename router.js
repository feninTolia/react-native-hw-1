import React, { useState } from 'react';

import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RegistrationScreen from './Screens/Auth/RegistrationScreen';
import LoginScreen from './Screens/Auth/LoginScreen';

import PostsScreen from './Screens/MainTabs/PostsScreen';
import CreatePostScreen from './Screens/MainTabs/CreatePostScreen';
import ProfileScreen from './Screens/MainTabs/ProfileScreen';

import MyHeader from './Screens/Components/MyHeader';
import TabBarIcon from './Screens/TabBarIcon';

const AuthStack = createStackNavigator();
const MainTabs = createBottomTabNavigator();

export default function useRoute(isAuth) {
  const [cameraOpen, setCameraOpen] = useState(null);

  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="LoginScreen">
        <AuthStack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{
            headerStyle: { height: 0 },
            headerTintColor: 'transparent',
          }}
        />
        <AuthStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerStyle: { height: 0 },
            headerTintColor: 'transparent',
          }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTabs.Navigator
      screenOptions={({ route }) => ({
        headerLeft: false,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBarStyle,
          display: cameraOpen ? 'none' : 'auto',
        },
      })}
    >
      <MainTabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              focused={focused}
              size={size}
              focusedIcon={require('./assets/tab-icons/grid-light.png')}
              unFocusedIcon={require('./assets/tab-icons/grid.png')}
            />
          ),
        }}
      />

      <MainTabs.Screen
        name="CreatePostScreen"
        component={CreatePostScreen}
        options={{
          // headerShown: false,
          unmountOnBlur: true,
          tabBarStyle: { display: false ? 'none' : 'auto' },
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              focused={focused}
              size={size}
              focusedIcon={require('./assets/tab-icons/union-light.png')}
              unFocusedIcon={require('./assets/tab-icons/union.png')}
            />
          ),
        }}
      />

      <MainTabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              focused={focused}
              size={size}
              focusedIcon={require('./assets/tab-icons/user-light.png')}
              unFocusedIcon={require('./assets/tab-icons/user.png')}
            />
          ),
        }}
      />
    </MainTabs.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIconLayout: {
    width: 70,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  tabBarStyle: {
    height: 84,
    paddingTop: 9,
    paddingBottom: 32,

    borderTopWidth: 0.5,
  },
});
