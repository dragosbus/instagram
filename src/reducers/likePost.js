import * as ActionTypes from '../actionTypes/actionTypes';

export const isLiked = (state=false, action) => {
  switch (action.type) {
    case ActionTypes.LIKE_POST:
      return action.payload;
    default:
      return state;
  }
};