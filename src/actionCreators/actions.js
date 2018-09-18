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

const getPosts = (posts) => ({
  type: ActionTypes.GET_USER_POSTS,
  payload: posts
});

const getUsersSearched = (users) => ({
  type: ActionTypes.GET_USER_SEARCHED,
  payload: users
});

export const getUserDataMiddleware = userId => dispatch => {
  firebase.database().ref(`users/${userId}`).on('value', s => {
    dispatch(getUserData(s.val()));
  });
};

export const getPostsMiddleware = userId => dispatch => {
  //get user posts
  firebase.database().ref(`posts/${userId}`).on('value', s => {
    dispatch(getPosts(s.val()));
  });
};

export const getUsersSearchedMiddleware = query => dispatch => {
  firebase.database().ref(`users`).on('value', s => {
    let allUsers = s.val();
    let users = [];
    for (let user in allUsers) {
      if (allUsers[user].username.includes(query) || allUsers[user].fullName.includes(query)) {
        users.push(allUsers[user]);
      }
    }
    dispatch(getUsersSearched(users));
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
          });
        } else {
          // User is signed out.
          // ...
        }
      })
    })
    .catch(err => dispatch(loginError()));
};