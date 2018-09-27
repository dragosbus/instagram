import {
  db
} from '../firebase/firebase';

export const getDataFromFirebase = (ref, cb) => {
  db.ref(ref).once('value', s => {
    cb(s);
  });
};

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
    getDataFromFirebase(`users/${userId}/following`, data => {
      for (let follow in data.val()) {
        if (data.val()[follow].id === userIdToFollow) {
          db.ref(`users/${userId}/following/${follow}`).remove();
        }
      }
    });

    getDataFromFirebase(`users/${userIdToFollow}/followers`, data => {
      for (let follow in data.val()) {
        if (data.val()[follow].id === userId) {
          db.ref(`users/${userIdToFollow}/followers/${follow}`).remove();
        }
      }
    });
  }
};