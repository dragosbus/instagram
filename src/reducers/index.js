import {combineReducers} from 'redux';
import {userReducer} from './userReducer';
import {userData} from './userData';
import {userPosts} from './userPosts';
import {userClickedData} from './userClickedData';
import {ownPosts} from './ownPosts';

const rootReducer = combineReducers({
  user: userReducer,
  userData: userData,
  ownPosts: ownPosts,
  userPosts: userPosts,
  userClickedData: userClickedData
});

export default rootReducer;