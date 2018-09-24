import * as ActionTypes from '../actionTypes/actionTypes';

export const checkFollow = (state=false, action) => {
  switch (action.type) {
    case ActionTypes.IS_FOLLOW:
      return action.payload;
    default:
      return state;
  }
};