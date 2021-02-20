import * as path from 'path';

const fs = require('fs');
const PROD_MODE = process.env.PROD_MODE || false;

const serviseAccount = {
	type: 'service_account',
	project_id: 'hackathon-olade',
	private_key_id: process.env.FIREBASE_ID,
	private_key: process.env.FIREBASE_PRIVATE_KEY,
	client_email: process.env.FIREBASE_CLIENT_EMAIL,
	client_id: process.env.FIREBASE_CLIENT_ID,
	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
	token_uri: 'https://oauth2.googleapis.com/token',
	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
	client_x509_cert_url:
		'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gx52q%40hackathon-olade.iam.gserviceaccount.com',
};

const devServiceAccount = PROD_MODE
	? null
	: JSON.parse(fs.readFileSync(path.resolve(__dirname, 'firebase_auth_config.json')));

export const config = {
	port: 5000,
	serviceAccount: PROD_MODE ? serviseAccount : devServiceAccount,
	hostname: PROD_MODE ? 'https://hackathon-olade.pp.ua' : 'http://localhost',
};
