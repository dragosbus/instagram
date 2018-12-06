import * as ActionTypes from '../actionTypes/actionTypes';

const initialState = {
  posts: [],
  index: 0
}

export const feedPosts = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_FOLLOWING_POSTS_SUCCESS:
      return Object.assign({}, state, {
        posts: [...state.posts, action.payload],
        index: state.index + 1
      });
    case ActionTypes.GET_FOLLOWING_POSTS_ERROR:
      return Object.assign({}, state, {
        posts: [...state.posts],
        index: state.index + 1
      });
    case ActionTypes.LOG_OUT:
      return initialState;
    default:
      return state;
  }
};