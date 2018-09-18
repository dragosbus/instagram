import {combineReducers} from 'redux';
import {userReducer} from './userReducer';
import {userData} from './userData';
import {userPosts} from './userPosts';
import {usersSearched} from './usersSearched';

const rootReducer = combineReducers({
  user: userReducer,
  userData: userData,
  userPosts: userPosts,
  usersSearched: usersSearched
});

export default rootReducer;