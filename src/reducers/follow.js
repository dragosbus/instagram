import * as ActionTypes from '../actionTypes/actionTypes';

export const follow = (state=[], action) => {
  switch (action.type) {
    case ActionTypes.GET_FOLOWERS:
      return action.payload;
    default:
      return state;
  }
};