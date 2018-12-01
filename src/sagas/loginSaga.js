import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  auth
} from '../firebase/firebase';
import {
  loginSuccess,
  loginError,
  logOut
} from '../actionCreators/login';
import {
  getDataFromFirebase,
  authHandler
} from '../utils/firebaseHandlers';


export function* loginWatcher() {
  yield takeLatest('CHECK_INITIAL_STATE_LOGGIN', checkInitialState);
  // yield takeLatest('INIT_LOGIN', loginWorker);
}

function* checkInitialState() {
  const user = yield call(authHandler);
  const userData = yield getDataFromFirebase(`users/${user.uid}`);
  yield put(loginSuccess({
    id: userData.id,
    username: userData.username,
    profile_picture: userData.profile_picture
  }));
}

function* loginWorker({
  userData
}) {
  try {
    yield auth.signInWithEmailAndPassword(userData.email, userData.password);
    const userLogged = yield call(authHandler);
    const user = yield getDataFromFirebase(`users/${userLogged.uid}`);
    yield put(loginSuccess({
      id: user.id,
      username: user.username,
      profile_picture: user.profile_picture
    }));
  } catch (err) {
    yield put(loginError(err.message));
  }
};