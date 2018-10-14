import {
  db
} from '../firebase/firebase';

export const getDataFromFirebase = async (ref, cb) => {
  let data;
  await db.ref(ref).once('value', s => {
    if (cb) {
      cb(s);
    } else {
      data = s.val();
    }
  });

  if (data) return data;
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

export const likePostHandler = (postId, owner, userId) => {
  db.ref(`posts/${owner}/${postId}`).push().set({
    time: Date.now(),
    userId
  });
};