import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import {auth} from './firebase/firebase';

auth.onAuthStateChanged(function (user) {
  if (user) {
    store.dispatch({type:'LOG_IN_SUCCESS', payload: {id: user.uid}})
  } else {
    // User is signed out.
    // ...
  }
});

const store = createStore(rootReducer,applyMiddleware(thunk));

export default store;