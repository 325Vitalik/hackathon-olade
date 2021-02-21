const firebase = require('firebase-admin');
import { config } from '../configs/config';

firebase.initializeApp({
	credential: firebase.credential.cert(config.serviceAccount),
});

const getUidFromRequest = async (req) => {
	const headerToken = req.headers.authorization;
	const token = headerToken.split(' ')[1];

	return firebase
		.auth()
		.verifyIdToken(token)
		.then((decodedToken) => decodedToken.uid);
};

export { firebase, getUidFromRequest };
