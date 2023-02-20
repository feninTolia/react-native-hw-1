import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userID: null,
  nickname: null,
  email: null,
  commentsAmount: 0,
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
      email: payload.email,
    }),

    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: (state, { payload }) => initialState,
  },
});
