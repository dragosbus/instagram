import * as ActionTypes from '../actionTypes/actionTypes';

export const getActivity = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.GET_ACTIVITY:
      return action.payload;
    default:
      return state;
  }
};