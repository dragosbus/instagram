import * as ActionTypes from '../actionTypes/actionTypes';
import {
  firebase
} from '../firebase/firebase';

const loginSuccess = (user) => ({
  type: ActionTypes.LOG_IN_SUCCESS,
  payload: user
});

const getUserData = (data) => ({
  type: ActionTypes.GET_USER_DATA,
  payload: data
});

const loginError = () => ({
  type: ActionTypes.LOG_IN_ERROR
});

const getOwnPosts = (posts) => ({
  type: ActionTypes.GET_OWN_POSTS,
  payload: posts
});

const getPosts = (posts) => ({
  type: ActionTypes.GET_USER_POSTS,
  payload: posts
});

const getUserProfileCliked = (userId) => ({
  type: ActionTypes.GET_USER_CLIKED_PROFILE,
  payload: userId
});

export const getUserProfileClikedMiddleware = userId => dispatch => {
  firebase.database().ref(`users/${userId}`).on('value', s => {
    dispatch(getUserProfileCliked(s.val()));
  });
};

export const getPostsMiddleware = userId => dispatch => {
  //get user posts
  firebase.database().ref(`posts/${userId}`).on('value', s => {
    dispatch(getPosts(s.val()));
  });
};

export const loginMiddleware = ({
  email,
  password
}) => dispatch => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          //login user
          dispatch(loginSuccess(user));
          //get user data
          firebase.database().ref(`users/${user.uid}`).on('value', s => {
            dispatch(getUserData(s.val()));
            //get own posts
            firebase.database().ref(`posts/${user.uid}`).on('value', s => {
              dispatch(getOwnPosts(s.val()));
            });
          });
        } else {
          // User is signed out.
          // ...
        }
      })
    })
    .catch(err => dispatch(loginError()));
};