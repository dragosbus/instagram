import * as ActionTypes from '../actionTypes/actionTypes';
import {
  db,
  auth
} from '../firebase/firebase';
import {
  getDataFromFirebase
} from '../utils/firebaseHandlers';
import {
  get
} from 'https';

const loginSuccess = (user) => ({
  type: ActionTypes.LOG_IN_SUCCESS,
  payload: user
});

const getUserData = (data) => ({
  type: ActionTypes.GET_USER_DATA,
  payload: data
});

const loginError = () => ({
  type: ActionTypes.LOG_IN_ERROR
});

const getPosts = (posts) => ({
  type: ActionTypes.GET_USER_POSTS,
  payload: posts
});

const getUsersSearched = (users) => ({
  type: ActionTypes.GET_USER_SEARCHED,
  payload: users
});

const isFollower = (data) => ({
  type: ActionTypes.IS_FOLLOW,
  payload: data
});

export const getFeed = (data) => ({
  type: ActionTypes.GET_FOLLOWING_POSTS,
  payload: data
});

export const loginMiddleware = ({
  email,
  password
}) => dispatch => {
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          //login user
          dispatch(loginSuccess({
            id: user.uid
          }));
          //get user data
          getDataFromFirebase(`users/${user.uid}`, (data) => {
            dispatch(getUserData(data.val()));
          });
        } else {
          // User is signed out.
          // ...
        }
      })
    })
    .catch(err => dispatch(loginError()));
};

export const getUserDataMiddleware = userId => dispatch => {
  getDataFromFirebase(`users/${userId}`, data => {
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
}

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
  return async function () {
    let postsFetched = await getDataFromFirebase('posts/');
    let followingUsersFetched = await getDataFromFirebase(`users/${userId}/following`);

    let followingUsers = Object.values(followingUsersFetched).map(id => id.id);
    
    for (let id in postsFetched) {
      if (followingUsers.includes(id)) {
        dispatch(getFeed((postsFetched[id])));
      }
    }
  }
};