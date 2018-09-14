import {combineReducers} from 'redux';
import {userReducer} from './userReducer';
import {userData} from './userData';

const rootReducer = combineReducers({
  user: userReducer,
  userData: userData
});

export default rootReducer;