import {combineReducers} from 'redux';
import userConnected from './userConnected';
import {userData} from './userData';
import {userPosts} from './userPosts';
import {usersSearched} from './usersSearched';
import {checkFollow} from './follow';
import {feedPosts} from './followingPosts';
import {isLiked} from './likePost';

const rootReducer = combineReducers({
  userConnected,
  userData: userData,
  userPosts: userPosts,
  usersSearched: usersSearched,
  checkFollow: checkFollow,
  feedPosts: feedPosts,
  isLiked: isLiked
});

export default rootReducer;