const firebase = require("firebase-admin");

const serviceAccount = require("../configs/firebase_auth_config.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
});

const firestore = firebase.firestore();

export { firestore, firebase };
