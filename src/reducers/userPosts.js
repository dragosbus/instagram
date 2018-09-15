import * as ActionTypes from '../actionTypes/actionTypes';

export const userPosts = (state={}, action) => {
  switch (action.type) {
    case ActionTypes.GET_USER_POST:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
};