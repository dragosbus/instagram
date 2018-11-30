import {
  call,
  put,
  takeLatest
} from 'redux-saga/effects';
import {
  auth
} from '../firebase/firebase';
import {
  loginSuccess,
  loginError,
  logOut
} from '../actionCreators/login';


export function* loginWatcher() {
  yield takeLatest('INIT_LOGIN', loginWorker);
}

function* loginWorker({ userData }) {
  try {
    yield auth.signInWithEmailAndPassword(userData.email, userData.password);
    yield auth.onAuthStateChanged(user => {
      if (user) {
        put(loginSuccess(user.uid))
      }
    });
  } catch (err) {
    yield put(loginError(err.message));
  }
};

// export const loginMiddleware = ({
//   email,
//   password
// }) => dispatch => {
//   auth
//     .signInWithEmailAndPassword(email, password)
//     .then(() => {
//       auth.onAuthStateChanged(function (user) {
//         if (user) {
//           //login user
//           //get user data
//           getDataFromFirebase(`users/${user.uid}`, data => {
//             dispatch(getUserData(data.val()));
//             dispatch(
//               loginSuccess({
//                 id: user.uid,
//                 username: data.val().username,
//                 profile_picture: data.val().profile_picture
//               })
//             );
//           });
//         } else {
//           // User is signed out.
//           // ...
//         }
//       });
//     })
//     .catch(err => dispatch(loginError()));
// };