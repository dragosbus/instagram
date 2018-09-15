import * as ActionTypes from '../actionTypes/actionTypes';
import {firebase} from '../firebase/firebase';

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

const getUserPosts = (posts) => ({
  type: ActionTypes.GET_USER_POST,
  payload: posts
});

export const loginMiddleware = ({email ,password}) => dispatch => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          dispatch(loginSuccess(user));
          firebase.database().ref(`users/${user.uid}`).on('value', s=>{
            dispatch(getUserData(s.val()));
            getUserPostMiddleware(user.uid);
          });
        } else {
          // User is signed out.
          // ...
        }
      });
    })
    .catch(err=>dispatch(loginError()));
};

export const getUserPostMiddleware = (userId) => dispatch => {
  firebase.database().ref(`posts/${userId}`).on('value', s=>{
    // dispatch(getUserPosts(s.val()));
    console.log(s.val())
  });
};



