import * as ActionTypes from '../actionTypes/actionTypes';

export const userReducer = (state = {
  isSignedIn: false
}, action) => {
  switch (action.type) {
    case ActionTypes.LOG_IN_SUCCESS:
      return Object.assign({}, action.payload, {
        isSignedIn: true
      });
    case ActionTypes.LOG_IN_ERROR:
      return {
        error: 'Please check if the email or the password is correct',
        isSignedIn: false
      };
    default:
      return state;
  }
};