import * as ActionTypes from '../actionTypes/actionTypes';

export const followingUsers = (state=[], action) => {
  switch (action.type) {
    case ActionTypes.GET_FOLLOWING_POSTS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};