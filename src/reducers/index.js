import {combineReducers} from 'redux';
import {userReducer} from './userReducer';
import {userData} from './userData';
import {userPosts} from './userPosts';

const rootReducer = combineReducers({
  user: userReducer,
  userData: userData,
  userPosts: userPosts
});

export default rootReducer;