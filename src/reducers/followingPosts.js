import * as ActionTypes from '../actionTypes/actionTypes';

export const followingPosts = (state=[], action) => {
  switch (action.type) {
    case ActionTypes.GET_FOLLOWING_POSTS:
      return action.payload;
    default:
      return state;
  }
};