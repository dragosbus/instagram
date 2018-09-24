import {combineReducers} from 'redux';
import {userReducer} from './userReducer';
import {userData} from './userData';
import {userPosts} from './userPosts';
import {usersSearched} from './usersSearched';
import {checkFollow} from './follow';
import {followingPosts} from './followingPosts';

const rootReducer = combineReducers({
  user: userReducer,
  userData: userData,
  userPosts: userPosts,
  usersSearched: usersSearched,
  checkFollow: checkFollow,
  followingPosts: followingPosts
});

export default rootReducer;