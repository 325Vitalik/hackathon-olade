const PROD_MODE = process.env.PROD_MODE;

export const config = {
	'hostname': PROD_MODE ? 'https://hackathon-olade.pp.ua' : 'http://localhost:5000',
};