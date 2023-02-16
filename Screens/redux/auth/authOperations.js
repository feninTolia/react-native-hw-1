import { auth } from '../../../firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { authSlice } from './authReducer';

const authSignUpUser =
  ({ nickname, email, password }) =>
  async (dispatch, getState) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(user, { displayName: nickname });

    dispatch(
      authSlice.actions.updateUserProfile({
        userID: user.uid,
        nickname: user.displayName,
      })
    );
  };

const authSignInUser =
  ({ email, password }) =>
  (dispatch, getState) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('user', user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSlice.actions.authSignOut());
};

const authStateChangeUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        authSlice.actions.updateUserProfile({
          userID: user.uid,
          nickname: user.displayName,
        })
      );
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};

export { authSignUpUser, authSignInUser, authSignOutUser, authStateChangeUser };
