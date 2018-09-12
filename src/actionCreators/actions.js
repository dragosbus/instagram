import * as ActionTypes from '../actionTypes/actionTypes';
import {firebase} from '../firebase/firebase';

const loginSuccess = (user) => ({
  type: ActionTypes.LOG_IN_SUCCESS,
  payload: user
});

const loginError = () => ({
  type: ActionTypes.LOG_IN_ERROR
});

export const loginMiddleware = ({email ,password}) => dispatch => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          dispatch(loginSuccess(user));
        } else {
          // User is signed out.
          // ...
        }
      });
    })
    .catch(err=>dispatch(loginError()));
};



