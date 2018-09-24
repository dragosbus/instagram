import * as ActionTypes from '../actionTypes/actionTypes';
import {
  firebase
} from '../firebase/firebase';

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

const getFollowingPosts = (data) => ({
  type: ActionTypes.GET_FOLLOWING_POSTS,
  payload: data
});

export const getUserDataMiddleware = userId => dispatch => {
  firebase.database().ref(`users/${userId}`).on('value', s => {
    dispatch(getUserData(s.val()));
  });
};

export const isFollowMiddleware = (userId, userIdToFollow) => dispatch => {
  //check if the user logged follow the user seen
  firebase.database().ref(`users/${userId}/following`).on('value', s => {
    if (s.val()) {
      let followingList = Object.keys(s.val()).map(key => {
        return s.val()[key].id;
      });

      if (followingList.includes(userIdToFollow)) {
        dispatch(isFollower(true));
      } else {
        dispatch(isFollower(false));
      }
    } else {
      dispatch(isFollower(false));
      console.log('empty')
    }
  });
}

export const getPostsMiddleware = userId => dispatch => {
  //is called every time the user route is changing to other user
  //so it need to be empty, not to contain the posts of the previous user
  let userPosts = [];
  firebase.database().ref(`posts/${userId}`).on('value', s => {
    if (s.val()) {
      //if the selected user dosnt have posts, it return an error
      //thats why we need to check
      userPosts = [...Object.values(s.val())];
    }
    dispatch(getPosts(userPosts));
  });
};

export const getUsersSearchedMiddleware = query => dispatch => {
  let users = [];
  firebase.database().ref(`users`).on('value', s => {
    const usersFetched = Object.values(s.val());
    for (let user in usersFetched) {
      if (usersFetched[user].username.includes(query)) {
        users.push(usersFetched[user]);
      }
    }
    dispatch(getUsersSearched(users));
  });
};



// //get last post from the following
// export const getFollowingPostsMiddleware = userId => dispatch => {
//   let posts = [];
//   //get the users who the current user follow
//   //iterate throught returned users
//   //get the posts from i'th user found
//   //find the userid for the every post found
//   //get the user data for the user found
//   //push to the empty array created in the begining, an object and then dispatch the getFollowingPosts action creator with the array with all data

//   firebase.database().ref(`users/${userId}/following`).on('value', s => {
//     for (let userFollowed in s.val()) {
//       let userIdFollowed = s.val()[userFollowed].id;
//       firebase.database().ref(`posts/${userIdFollowed}`).on('value', p => {
//         if (p.val()) {
//           for (let postId in p.val()) {
//             firebase.database().ref(`users/${p.val()[postId].userId}`).on('value', user => {
//               if (user.val()) {
//                 posts.push({
//                   description: p.val()[postId].description,
//                   likes: p.val()[postId].likes,
//                   photo: p.val()[postId].photo,
//                   userId: p.val()[postId].userId,
//                   username: user.val().username,
//                   profile_photo: user.val().profile_picture
//                 });
//               }
//               dispatch(getFollowingPosts([...posts]));
//             });

//           }
//         }
//       });
//     }
//   });
// };

export const loginMiddleware = ({
  email,
  password
}) => dispatch => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          //login user
          dispatch(loginSuccess({
            id: user.uid
          }));
          //get user data
          firebase.database().ref(`users/${user.uid}`).on('value', s => {
            dispatch(getUserData(s.val()));
          });
        } else {
          // User is signed out.
          // ...
        }
      })
    })
    .catch(err => dispatch(loginError()));
};