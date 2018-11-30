import * as ActionTypes from '../actionTypes/actionTypes';

export const checkInitialStateLoggin = () => ({
  type: ActionTypes.CHECK_INITIAL_STATE_LOGGIN
});

export const initLogin = () => ({
  type: ActionTypes.INIT_LOGIN
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