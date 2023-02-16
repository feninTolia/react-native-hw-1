import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userID: null,
  nickname: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userID: payload.userID,
      nickname: payload.nickname,
    }),

    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: (state, { payload }) => initialState,
  },
});
