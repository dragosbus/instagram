import * as ActionTypes from '../actionTypes/actionTypes';

export const userData = (state={}, action) => {
  switch (action.type) {
    case ActionTypes.GET_USER_DATA:
      return Object.assign({}, action.payload);
    case ActionTypes.LOG_OUT:
      return Object.assign({});
    default:
      return state;
  }
};