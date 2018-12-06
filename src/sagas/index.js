import {
  fork,
  all
} from 'redux-saga/effects';
import * as login from './loginSaga';

export default function* rootSaga() {
  yield all([
    ...Object.values(login)
  ].map(fork))
};