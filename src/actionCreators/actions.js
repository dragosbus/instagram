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
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(()=>console.log('succes'))
    .catch(err=>console.log('not success'));
};



