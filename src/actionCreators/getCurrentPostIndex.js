import * as ActionTypes from '../actionTypes/actionTypes';

export const getCurrentPostIndex = index => ({
  type: ActionTypes.GET_CURRENT_POST_INDEX,
  payload: index
});