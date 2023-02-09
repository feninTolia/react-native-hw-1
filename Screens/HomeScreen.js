import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostsScreen from './PostsScreen';
import CommentsScreen from './CommentsScreen';
import ProfileScreen from './ProfileScreen';
import MyHeader from './MyHeader';

const Tabs = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerLeft: false,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 84,
          paddingTop: 9,
          paddingBottom: 32,

          borderTopWidth: 0.5,
        },
      })}
    >
      <Tabs.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                ...styles.tabIconLayout,
                backgroundColor: focused ? 'tomato' : 'transparent',
              }}
            >
              <Image
                source={
                  focused
                    ? require('../assets/tab-icons/grid-light.png')
                    : require('../assets/tab-icons/grid.png')
                }
                style={{
                  width: size,
                  height: size,
                  borderRadius: 0,
                }}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: true,

          header: ({ navigation, route, options }) => {
            return <MyHeader title={'Posts'} />;
          },
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                ...styles.tabIconLayout,
                backgroundColor: focused ? 'tomato' : 'transparent',
              }}
            >
              <Image
                source={
                  focused
                    ? require('../assets/tab-icons/union-light.png')
                    : require('../assets/tab-icons/union.png')
                }
                style={{
                  width: size,
                  height: size,
                  borderRadius: 0,
                }}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                ...styles.tabIconLayout,
                backgroundColor: focused ? 'tomato' : 'transparent',
              }}
            >
              <Image
                source={
                  focused
                    ? require('../assets/tab-icons/user-light.png')
                    : require('../assets/tab-icons/user.png')
                }
                style={{
                  width: size,
                  height: size,
                  borderRadius: 0,
                }}
              />
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
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
});
