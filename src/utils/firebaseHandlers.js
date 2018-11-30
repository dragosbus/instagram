import {
  db, auth
} from '../firebase/firebase';

export const authHandler = async () => {
  let userLogged;
  await auth.onAuthStateChanged(user => {
    if(user) {
      userLogged = user;
    }
  });
  
  return userLogged;
};

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

export const likePostHandler = async (postId, owner, userId) => {
  //first check if is not liked
  let isChecked;
  await db.ref(`posts/${owner}/${postId}`).once('value', s => {
    isChecked = Object.values(s.val()).filter(prop => typeof prop === 'object' && prop !== null && !Array.isArray(prop)).find(user => user.userId === userId)
  });

  if (!isChecked) {
    await db.ref(`posts/${owner}/${postId}`).push().set({
      time: Date.now(),
      userId
    });
  }
};

export const createActivity = (user, ownerId, type) => {
  let activity;
  console.log(user, ownerId, type)
  if (type === 'follow') activity = 'started following you';
  else if (type === 'post_liked') activity = 'liked your photo';
  else if (type === 'post_comment') activity = 'commented your post';
  if (user.id !== ownerId) {
    db.ref(`users/${ownerId}/activity`).push().set({
      activity: {
        profile_picture: user.profile_picture,
        username: user.username,
        activity,
        type
      }
    });
  }
};

export const totalLikes = (postId, owner) => {
  return getDataFromFirebase(`posts/${owner}/${postId}`).then(res => {
    return res ?
      Object.values(res).filter(prop => typeof prop === 'object' && prop !== null && !Array.isArray(prop)) : [];
  }).then(res => res.length);
}