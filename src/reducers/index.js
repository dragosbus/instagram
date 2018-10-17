import {combineReducers} from 'redux';
import userConnected from './userConnected';
import {userData} from './userData';
import {userPosts} from './userPosts';
import {usersSearched} from './usersSearched';
import {checkFollow} from './follow';
import {feedPosts} from './followingPosts';
import {currentPostIndex} from './currentPostIndex';
import {getActivity} from './getActivity';

const rootReducer = combineReducers({
  userConnected,
  userData: userData,
  userPosts: userPosts,
  usersSearched: usersSearched,
  checkFollow: checkFollow,
  feedPosts: feedPosts,
  currentPostIndex: currentPostIndex,
  activity: getActivity
});

export default rootReducer;