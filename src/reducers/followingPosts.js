import * as ActionTypes from '../actionTypes/actionTypes';

const initialState = {
  posts: [],
  index: 0
}

export const feedPosts = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_FOLLOWING_POSTS:
      return Object.assign({}, state, {
        posts: [...state.posts, ...action.payload],
        index: state.index + 1
      });
    default:
      return state;
  }
};