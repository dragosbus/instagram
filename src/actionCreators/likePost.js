import * as ActionTypes from '../actionTypes/actionTypes';
import {
  getDataFromFirebase
} from '../utils/firebaseHandlers';

export const likePost = (value) => ({
  type: ActionTypes.LIKE_POST,
  payload: value
});

export const likePostMiddleware = (postId, owner, userId) => dispatch => {
  getDataFromFirebase(`posts/${owner}/${postId}`).then(res => {
    const props = res ? Object.values(res).filter(prop => typeof prop === 'object' && prop !== null && !Array.isArray(prop)) : [];

    props.forEach(user => {
      if (userId === user.userId) {
        dispatch(likePost(true))
      } else {
        dispatch(likePost(false));
      }
    });
  });
};