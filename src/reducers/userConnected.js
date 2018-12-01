import * as ActionTypes from '../actionTypes/actionTypes';

const initialState = {
  initLoggin: false,
  userId: null,
  isSignedIn: false,
  error: null,
};

const userConnected = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.INIT_LOGIN:
      return {
        ...initialState,
        initLoggin: true
      };
    case ActionTypes.LOG_IN_SUCCESS:
      return {
        initLoggin: false,
        ...action.payload,
        isSignedIn: true,
        error: null
      };
    case ActionTypes.LOG_IN_ERROR:
      return {
        initLoggin: false,
        isSignedIn: false,
        userId: null,
        error: action.err,
      };
    case ActionTypes.LOG_OUT:
      return Object.assign({}, {
        isSignedIn: false
      });
    default:
      return state;
  }
};

export default userConnected;