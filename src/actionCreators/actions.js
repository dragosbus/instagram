import {
  getUserDataMiddleware
} from './getUserData';
import {
  getPostsForFeed
} from './getFeed';
import {
  getPostsMiddleware
} from './getOwnPosts';
import {
  getUsersSearchedMiddleware
} from './getUsersSearched';
import {
  isFollowMiddleware
} from './isFollower';
import {
  loginMiddleware
} from './login';
import {
  getCurrentPostIndex
} from './getCurrentPostIndex';
import {
  fetchActivity
} from './getActivity';

export {
  getUserDataMiddleware,
  getPostsForFeed,
  getPostsMiddleware,
  getUsersSearchedMiddleware,
  isFollowMiddleware,
  loginMiddleware,
  getCurrentPostIndex,
  fetchActivity
}