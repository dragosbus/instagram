import * as ActionTypes from '../actionTypes/actionTypes';
import {
  getDataFromFirebase
} from '../utils/firebaseHandlers';

export const getUserData = data => ({
  type: ActionTypes.GET_USER_DATA,
  payload: data
});

export const getUserDataMiddleware = userId => dispatch => {
  getDataFromFirebase(`users/${userId}`, data => {
    dispatch(getUserData(data.val()));
  });
};