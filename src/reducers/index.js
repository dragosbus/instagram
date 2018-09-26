import {combineReducers} from 'redux';
import userConnected from './userConnected';
import {userData} from './userData';
import {userPosts} from './userPosts';
import {usersSearched} from './usersSearched';
import {checkFollow} from './follow';
import {followingPosts} from './followingPosts';

const rootReducer = combineReducers({
  userConnected,
  userData: userData,
  userPosts: userPosts,
  usersSearched: usersSearched,
  checkFollow: checkFollow,
  followingPosts: followingPosts
});

export default rootReducer;