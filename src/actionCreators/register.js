import * as ActionTypes from '../actionTypes/actionTypes';

export const initRegister = () => ({
  type: ActionTypes.INIT_REGISTER
});

export const successRegister = () => ({
  type: ActionTypes.SUCCESS_REGISTER,
});

export const errorRegister = () => ({
  type: ActionTypes.ERROR_REGISTER
});