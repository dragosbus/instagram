import * as ActionTypes from '../actionTypes/actionTypes';
import {
  db,
  auth
} from '../firebase/firebase';
import {
  getDataFromFirebase
} from '../utils/firebaseHandlers';

export const getPosts = posts => ({
  type: ActionTypes.GET_USER_POSTS,
  payload: posts
});

export const getPostsMiddleware = userId => dispatch => {
    //is called every time the user route is changing to other user
    //so it need to be empty, not to contain the posts of the previous user, so we dispatch an empty array synchronous and asynchronous the posts for the current user
    let userPosts = [];
    dispatch(getPosts([]));
    getDataFromFirebase(`posts/${userId}`).then(res => {
        userPosts = res ? [...Object.values(res)] : [];
        userPosts.length ? dispatch(getPosts(userPosts)) : dispatch(getPosts([]));
        });
    };