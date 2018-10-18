import {
  createStore,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import {
  auth
} from './firebase/firebase';
import {
  getDataFromFirebase
} from './utils/firebaseHandlers';
import {
  getUserData
} from './actionCreators/getUserData';

auth.onAuthStateChanged(function (user) {
  if (user) {
    getDataFromFirebase(`users/${user.uid}`, data => {
      store.dispatch(getUserData(data.val()));
      store.dispatch({
        type: 'LOG_IN_SUCCESS',
        payload: {
          id: user.uid,
          username: data.val().username,
          profile_picture: data.val().profile_picture
        }
      })
    });
  } else {
    // User is signed out.
    // ...
  }
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;