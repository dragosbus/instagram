import * as ActionTypes from '../actionTypes/actionTypes';

export const userData = (state={}, action) => {
  switch (action.type) {
    case ActionTypes.GET_USER_DATA:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
};