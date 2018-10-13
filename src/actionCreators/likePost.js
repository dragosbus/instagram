import * as ActionTypes from '../actionTypes/actionTypes';
import { db, auth } from '../firebase/firebase';
import { getDataFromFirebase } from '../utils/firebaseHandlers';

export const likePost = () => ({
  type: ActionTypes.LIKE_POST
});