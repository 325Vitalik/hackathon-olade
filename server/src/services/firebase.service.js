const firebase = require('firebase-admin');
import { config } from '../configs/config';

firebase.initializeApp({
	credential: firebase.credential.cert(config.serviceAccount),
});

const firestore = firebase.firestore();

export { firestore, firebase };
