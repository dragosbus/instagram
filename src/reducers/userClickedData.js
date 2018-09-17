import * as ActionTypes from '../actionTypes/actionTypes';

export const userClickedData = (state={}, action) => {
  switch (action.type) {
    case ActionTypes.GET_USER_CLIKED_PROFILE:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
};