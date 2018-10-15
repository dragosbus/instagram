import * as ActionTypes from '../actionTypes/actionTypes';
import {
  getDataFromFirebase
} from '../utils/firebaseHandlers';

const getFeed = data => ({
  type: ActionTypes.GET_FOLLOWING_POSTS_SUCCESS,
  payload: data
});

//action creator when the currentUser dosn't have posts
//return the previous posts fetched with the index incremented
const getFeedError = () => ({
  type: ActionTypes.GET_FOLLOWING_POSTS_ERROR
});

export const getPostsForFeed = userId => dispatch => {
  async function nextUser() {
    let users = getDataFromFirebase(`users/${userId}/following`);
    return users;
  }
  return function getPost(index) {
    nextUser().then(res => {
      let currentUser = res && index <= Object.values(res).length - 1 ? Object.values(res)[index].id : null;

      if (currentUser) {
        getDataFromFirebase(`posts/${currentUser}`).then(post => {
          if (!post) {
            dispatch(getFeedError());
            //if the current user dosnt have posts, we should get the next user by call recursive getPost function
            getPost(index + 1);
          } else {
            //create the post and dispatch it if the current user has posts
            
            const postsFetchedArr = Object.values(post);
            let currentPost = postsFetchedArr[postsFetchedArr.length - 1];
            //iterate throught the props of the currentpost
            //get the user who liked the post(is an object so check if is type object)
            //and use find method array to get it if the user logged liked the post
            const isLiked = Object.values(currentPost).filter(prop => typeof prop === 'object' && prop !== null && !Array.isArray(prop)).find(user=>user.userId === userId);
            
            getDataFromFirebase(`users/${currentPost.userId}`).then(user => {
              dispatch(
                getFeed(
                  Object.assign({}, currentPost, {
                    username: user.username,
                    profile_photo: user.profile_picture,
                    postId: Object.keys(post)[0],
                    isLiked: isLiked ? true : false
                  })
                )
              );
            });
          }
        });
      }
    });
  };
};