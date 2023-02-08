import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostsScreen from './PostsScreen';
import CommentsScreen from './CommentsScreen';
import ProfileScreen from './ProfileScreen';

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({ tabBarShowLabel: false })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
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
};

const styles = StyleSheet.create({
  tabIconLayout: {
    width: 70,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});

export default Home;
