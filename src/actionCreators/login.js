import * as ActionTypes from '../actionTypes/actionTypes';

export const checkInitialStateLoggin = () => ({
  type: ActionTypes.CHECK_INITIAL_STATE_LOGGIN
});

export const initLogin = (credentials) => ({
  type: ActionTypes.INIT_LOGIN,
  payload: credentials
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