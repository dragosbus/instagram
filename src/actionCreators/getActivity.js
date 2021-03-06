import * as ActionTypes from '../actionTypes/actionTypes';
import {getDataFromFirebase} from '../utils/firebaseHandlers';

const getActivity = data => ({
  type: ActionTypes.GET_ACTIVITY,
  payload: data
});

export const fetchActivity = userId => dispatch => {
  getDataFromFirebase(`users/${userId}/activity`).then(res=>{
    if(res) {
      dispatch(getActivity(Object.values(res)))
    } else {
      dispatch(getActivity([]));
    }
  });
};