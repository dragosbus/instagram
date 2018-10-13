import * as ActionTypes from '../actionTypes/actionTypes';
import {
  db,
  auth
} from '../firebase/firebase';
import {
  getDataFromFirebase
} from '../utils/firebaseHandlers';

export const getUserData = data => ({
  type: ActionTypes.GET_USER_DATA,
  payload: data
});

export const getUserDataMiddleware = userId => dispatch => {
  getDataFromFirebase(`users/${userId}`, data => {
    console.log('dispatched:get user data');
    dispatch(getUserData(data.val()));
  });
};