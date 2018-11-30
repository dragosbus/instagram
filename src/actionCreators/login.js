import * as ActionTypes from '../actionTypes/actionTypes';

export const initLogin = (userData) => ({
  type: ActionTypes.INIT_LOGIN,
  userData
});

export const loginSuccess = user => ({
  type: ActionTypes.LOG_IN_SUCCESS,
  payload: user
});

export const loginError = (err) => ({
  type: ActionTypes.LOG_IN_ERROR,
  err
});

export const logOut = () => ({
  type: ActionTypes.LOG_OUT
});