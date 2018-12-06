import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  getDataFromFirebase,
  authHandler
} from '../utils/firebaseHandlers';

export function* registerWatcher() {
  yield takeLatest('INIT_REGISTER', registerWorker);
}

function* registerWorker() {

}