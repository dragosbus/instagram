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

const getFolowers = (data) => ({
  type: ActionTypes.GET_FOLOWERS,
  payload: data
});

export const getUserDataMiddleware = userId => dispatch => {
  firebase.database().ref(`users/${userId}`).on('value', s => {
    dispatch(getUserData(s.val()));
  });
};

export const getPostsMiddleware = userId => dispatch => {
  //is called every time the user route is changing to other user
  //so it need to be empty, not to containt the posts of the previous user
  let userPosts = [];
  firebase.database().ref(`posts/${userId}`).on('value', s => {
    if(s.val()) {
      //if the selected user dosnt have posts, it return an error
      userPosts = [...Object.values(s.val())];
    }
    dispatch(getPosts(userPosts));
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

export const followMiddleware = (userId, userIdFollowed) => dispatch => {
  const followers = [];
  //get followers and check if exist
  firebase.database().ref(`users/${userId}/following`).on('value', s => {
    for (let follow in s.val()) {
      followers.push(s.val()[follow]['id']);
    }
    dispatch(getFolowers(followers));
  });
  //update just if is not already follow
  if (!followers.includes(userIdFollowed)) {
    firebase.database().ref(`users/${userId}/following`).push().set({
      id: userIdFollowed
    });

    firebase.database().ref(`users/${userIdFollowed}/followers`).push().set({
      id: userId
    });
  }
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
          //get followers
          const followers = [];
          firebase.database().ref(`users/${user.uid}/following`).on('value', s => {
            for (let follow in s.val()) {
              followers.push(s.val()[follow]['id']);
            }
            dispatch(getFolowers(followers));
          });
        } else {
          // User is signed out.
          // ...
        }
      })
    })
    .catch(err => dispatch(loginError()));
};