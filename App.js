import { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { store } from './Screens/redux/store';

import Main from './Components/Main';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
