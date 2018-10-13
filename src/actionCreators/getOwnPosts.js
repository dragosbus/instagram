import * as ActionTypes from '../actionTypes/actionTypes';
import {
  db,
  auth
} from '../firebase/firebase';
import {
  getDataFromFirebase
} from '../utils/firebaseHandlers';

const getPosts = posts => ({
  type: ActionTypes.GET_USER_POSTS,
  payload: posts
});

export const getPostsMiddleware = userId => dispatch => {
  //is called every time the user route is changing to other user
  //so it need to be empty, not to contain the posts of the previous user
  let userPosts = [];
  db.ref(`posts/${userId}`).on('value', s => {
    if (s.val()) {
      //if the selected user dosnt have posts, it return an error
      //thats why we need to check
      userPosts = [...Object.values(s.val())];
    }
    dispatch(getPosts(userPosts));
  });
};