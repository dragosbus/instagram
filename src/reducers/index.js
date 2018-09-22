import {combineReducers} from 'redux';
import {userReducer} from './userReducer';
import {userData} from './userData';
import {userPosts} from './userPosts';
import {usersSearched} from './usersSearched';
import {follow} from './follow';
import {followingPosts} from './followingPosts';

const rootReducer = combineReducers({
  user: userReducer,
  userData: userData,
  userPosts: userPosts,
  usersSearched: usersSearched,
  followers: follow,
  followingPosts: followingPosts
});

export default rootReducer;