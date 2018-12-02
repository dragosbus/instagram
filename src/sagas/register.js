import {
  call,
  put,
  takeLatest,
  fork
} from 'redux-saga/effects';
import {
  getDataFromFirebase,
  authHandler
} from '../utils/firebaseHandlers';