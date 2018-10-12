import * as ActionTypes from '../actionTypes/actionTypes';
import { db, auth } from '../firebase/firebase';
import { getDataFromFirebase } from '../utils/firebaseHandlers';

const loginSuccess = user => ({
  type: ActionTypes.LOG_IN_SUCCESS,
  payload: user
});

const getUserData = data => ({
  type: ActionTypes.GET_USER_DATA,
  payload: data
});

const loginError = () => ({
  type: ActionTypes.LOG_IN_ERROR
});

const getPosts = posts => ({
  type: ActionTypes.GET_USER_POSTS,
  payload: posts
});

const getUsersSearched = users => ({
  type: ActionTypes.GET_USER_SEARCHED,
  payload: users
});

const isFollower = data => ({
  type: ActionTypes.IS_FOLLOW,
  payload: data
});

export const getFeed = data => ({
  type: ActionTypes.GET_FOLLOWING_POSTS_SUCCESS,
  payload: data
});

//action creator when the currentUser dosn't have posts
//return the previous posts fetched with the index incremented
export const getFeedError = () => ({
  type: ActionTypes.GET_FOLLOWING_POSTS_ERROR
});

export const loginMiddleware = ({ email, password }) => dispatch => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      auth.onAuthStateChanged(function(user) {
        if (user) {
          //login user
          dispatch(
            loginSuccess({
              id: user.uid
            })
          );
          //get user data
          getDataFromFirebase(`users/${user.uid}`, data => {
            dispatch(getUserData(data.val()));
          });
        } else {
          // User is signed out.
          // ...
        }
      });
    })
    .catch(err => dispatch(loginError()));
};

export const getUserDataMiddleware = userId => dispatch => {
  getDataFromFirebase(`users/${userId}`, data => {
    console.log('dispatched:get user data');
    dispatch(getUserData(data.val()));
  });
};

export const getUsersSearchedMiddleware = query => dispatch => {
  getDataFromFirebase(`users`, data => {
    const usersList = Object.values(data.val())
      .map(user => user)
      .filter(user => user.username.startsWith(query));

    dispatch(getUsersSearched(usersList));
  });
};

export const isFollowMiddleware = (userId, userIdToFollow) => dispatch => {
  //check if the user logged follow the user seen
  db.ref(`users/${userId}/following`).on('value', s => {
    if (s.val()) {
      let followingList = Object.values(s.val()).map(user => {
        return user.id;
      });

      if (followingList.includes(userIdToFollow)) {
        dispatch(isFollower(true));
      } else {
        dispatch(isFollower(false));
      }
    } else {
      dispatch(isFollower(false));
    }
  });
};

export const getPostsMiddleware = userId => dispatch => {
  //is called every time the user route is changing to other user
  //so it need to be empty, not to contain the posts of the previous user
  let userPosts = [];
  db.ref(`posts/${userId}`).on('value', s => {
    if (s.val()) {
      //if the selected user dosnt have posts, it return an error
      //thats why we need to check
      userPosts = [...Object.values(s.val())];
    }
    dispatch(getPosts(userPosts));
  });
};

export const getPostsForFeed = userId => dispatch => {
  console.log('dispatch');
  async function nextUser() {
    let users = getDataFromFirebase(`users/${userId}/following`);
    return users;
  }
  return function getPost(index) {
    nextUser().then(res => {
      let currentUser = res && index <= Object.values(res).length - 1 ? Object.values(res)[index].id : null;

      if (currentUser) {
        getDataFromFirebase(`posts/${currentUser}`).then(res => {
          if (!res) {
            dispatch(getFeedError());
            //if the current user dosnt have posts, we should get the next user by call recursive getPost function
            getPost(index + 1);
          } else {
            //create the post and dispatch it if the current user has posts
            const postsFetchedArr = Object.values(res);
            let currentPost = postsFetchedArr[postsFetchedArr.length - 1];

            getDataFromFirebase(`users/${currentPost.userId}`).then(user => {
              dispatch(
                getFeed(
                  Object.assign({}, currentPost, {
                    username: user.username,
                    profile_photo: user.profile_picture
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
