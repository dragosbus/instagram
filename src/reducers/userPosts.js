import * as ActionTypes from '../actionTypes/actionTypes';

export const userPosts = (state=[], action) => {
  switch (action.type) {
    case ActionTypes.GET_USER_POSTS:
      return action.payload;
    case ActionTypes.LOG_OUT:
      return [];
    default:
      return state;
  }
};