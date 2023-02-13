import React from 'react';

import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RegistrationScreen from './Screens/Auth/RegistrationScreen';
import LoginScreen from './Screens/Auth/LoginScreen';

import PostsScreen from './Screens/MainTabs/PostsScreen';
import CreatePostScreen from './Screens/MainTabs/CreatePostScreen';
import ProfileScreen from './Screens/MainTabs/ProfileScreen';

import MyHeader from './Screens/MyHeader';
import TabBarIcon from './Screens/TabBarIcon';
import CameraTest from './Screens/MainTabs/CameraTest';

const AuthStack = createStackNavigator();
const CreatePostStack = createStackNavigator();
const MainTabs = createBottomTabNavigator();

export default function useRoute(isAuth) {
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
        tabBarStyle: styles.tabBarStyle,
      })}
    >
      <MainTabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: true,

          header: ({ navigation, route, options }) => {
            return <MyHeader title={'Posts'} logout />;
          },
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
        options={{
          headerLeft: true,
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
      >
        {() => (
          <CreatePostStack.Navigator>
            <CreatePostStack.Screen
              name="CreatePost"
              component={CreatePostScreen}
              options={{
                headerShown: true,
                header: ({ navigation, route, options }) => {
                  return <MyHeader title={'Create post'} />;
                },
              }}
            />
            <CreatePostStack.Screen
              name="CameraTest"
              component={CameraTest}
              options={{ headerShown: false }}
            />
          </CreatePostStack.Navigator>
        )}
      </MainTabs.Screen>

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
