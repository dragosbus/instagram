import * as ActionTypes from '../actionTypes/actionTypes';
import { getDataFromFirebase } from '../utils/firebaseHandlers';

const getUsersSearched = users => ({
  type: ActionTypes.GET_USER_SEARCHED,
  payload: users
});

export const getUsersSearchedMiddleware = query => dispatch => {
  getDataFromFirebase(`users`, data => {
    const usersList = Object.values(data.val())
      .map(user => user)
      .filter(user => user.username.startsWith(query));

    dispatch(getUsersSearched(usersList));
  });
};