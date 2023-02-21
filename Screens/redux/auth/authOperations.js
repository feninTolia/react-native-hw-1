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
  ({ nickname, photoURL, email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: nickname, photoURL: photoURL });

      dispatch(
        authSlice.actions.updateUserProfile({
          userID: user.uid,
          nickname: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

const authSignInUser =
  ({ email, password }) =>
  (dispatch, getState) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((e) => {
        console.log(e);
      });
  };

const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.authSignOut());
  } catch (e) {
    console.log(e);
  }
};

const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authSlice.actions.updateUserProfile({
            userID: user.uid,
            nickname: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
        dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const updateUserAvatar = (photoURL) => async (dispatch, getState) => {
  await updateProfile(auth.currentUser, { photoURL });
  dispatch(
    authSlice.actions.updateUserAvatar({
      photoURL: auth.currentUser.photoURL,
    })
  );
};

export {
  authSignUpUser,
  authSignInUser,
  authSignOutUser,
  authStateChangeUser,
  updateUserAvatar,
};
