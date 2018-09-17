import * as ActionTypes from '../actionTypes/actionTypes';

export const ownPosts = (state={}, action) => {
  switch (action.type) {
    case ActionTypes.GET_OWN_POSTS:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
};