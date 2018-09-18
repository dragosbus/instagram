import * as ActionTypes from '../actionTypes/actionTypes';

export const usersSearched = (state=[], action) => {
  switch (action.type) {
    case ActionTypes.GET_USER_SEARCHED:
      return action.payload;
    default:
      return state;
  }
};