import {
  db
} from '../firebase/firebase';

export const followHandlerDb = (userId, userIdToFollow, action) => {
  if (action === 'follow') {
    db.ref(`users/${userId}/following`)
      .push()
      .set({
        id: userIdToFollow
      });

    db.ref(`users/${userIdToFollow}/followers`)
      .push()
      .set({
        id: userId
      });
  } else if (action === 'unfollow') {
    db.ref(`users/${userId}/following`).once('value', s => {
      for (let follow in s.val()) {
        if (s.val()[follow].id === userIdToFollow) {
          db.ref(`users/${userId}/following/${follow}`).remove();
        }
      }
    });

    db.ref(`users/${userIdToFollow}/followers`).once('value', s => {
      for (let follow in s.val()) {
        if (s.val()[follow].id === userId) {
          db.ref(`users/${userIdToFollow}/followers/${follow}`).remove();
        }
      }
    });
  }
};

export const getDataFromFirebase = (ref, cb) => {
  db.ref(ref).once('value', s => {
    cb(s);
  });
};