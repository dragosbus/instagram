import * as ActionTypes from '../actionTypes/actionTypes';
import {
  db,
  auth
} from '../firebase/firebase';
import {
  getDataFromFirebase
} from '../utils/firebaseHandlers';
import {
  getUserData
} from './getUserData';

const loginSuccess = user => ({
  type: ActionTypes.LOG_IN_SUCCESS,
  payload: user
});

const loginError = () => ({
  type: ActionTypes.LOG_IN_ERROR
});

export const loginMiddleware = ({
  email,
  password
}) => dispatch => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          //login user
          dispatch(
            loginSuccess({
              id: user.uid
            })
          );
          //get user data
          getDataFromFirebase(`users/${user.uid}`, data => {
            dispatch(getUserData(data.val()));
          });
        } else {
          // User is signed out.
          // ...
        }
      });
    })
    .catch(err => dispatch(loginError()));
};