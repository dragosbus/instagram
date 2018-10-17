import * as ActionTypes from '../actionTypes/actionTypes';
import {
  db,
  auth
} from '../firebase/firebase';
import {
  createActivity
} from '../utils/firebaseHandlers';


const isFollower = data => ({
  type: ActionTypes.IS_FOLLOW,
  payload: data
});

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