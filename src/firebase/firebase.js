import * as firebase from 'firebase';
import data from '../config';

var config = {
    apiKey: data.API_KEY,
    authDomain: data.AUTH_DOMAIN,
    databaseURL: data.DATABASE_URL,
    projectId: data.PROJECT_ID,
    storageBucket: data.STORAGE_BUCKET,
    messagingSenderId: data.MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const db = firebase.database();
const auth = firebase.auth();

export {
    firebase,
    db,
    auth
};