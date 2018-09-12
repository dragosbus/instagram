import * as ActionTypes from '../actionTypes/actionTypes';

export const userReducer = (state={}, action) => {
  switch(action.type) {
    case ActionTypes.LOG_IN_SUCCESS:
      return ;
    case ActionTypes.LOG_IN_ERROR:
      return {error: 'Please check if the email or the password is correct'};
    default:
      return state;
  }
};