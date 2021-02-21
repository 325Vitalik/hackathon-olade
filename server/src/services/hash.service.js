import dhash from 'dhash';
const https = require('https');

export const hashService = {
	async generateHash(imgUrl, callback) {
		return https.get(
			imgUrl,
			(res) => {
				let body= Buffer.alloc(0);

				if (res.statusCode !== 200) {
					console.log('HTTPS ' + res.statusCode);
					return;
				}

				res.on('data', chunk => {
					body = Buffer.concat([body, chunk]);
				});

				res.on('end', () => {
					dhash(body, (err, hash) => {
						callback(hash);
					}, 16);
				});

				res.on('error', err => {
					console.log(err);
				});
			}
		);
	},
};