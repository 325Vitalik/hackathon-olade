const firebase = require('firebase-admin');
import { config } from '../configs/config';

firebase.initializeApp({
	credential: firebase.credential.cert(config.serviceAccount),
});

export { firebase };
