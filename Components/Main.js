import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import { authStateChangeUser } from '../Screens/redux/auth/authOperations';

import useRoute from '../router';

export default function Main() {
  const dispatch = useDispatch();

  const { stateChange } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
