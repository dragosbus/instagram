import * as ActionTypes from '../actionTypes/actionTypes';

export const feedPosts = (state=[], action) => {
  switch (action.type) {
    case ActionTypes.GET_FOLLOWING_POSTS:
      return [...state, action.payload];
    default:
      return state;
  }
};