import * as ActionTypes from '../actionTypes/actionTypes';

export const currentPostIndex = (state = 0, action) => {
  switch (action.type) {
    case ActionTypes.GET_CURRENT_POST_INDEX:
      return action.payload;
    default:
      return state;
  }
};