import dhash from 'dhash';
const https = require('https');

export const hashService = {
	generateHash(imgUrl) {
		return new Promise((resolve, reject) => {
			https.get(imgUrl, (res) => {
				let body = Buffer.alloc(0);

				if (res.statusCode !== 200) {
					console.log('HTTPS ' + res.statusCode);
					return reject('!== 200');
				}

				res.on('data', (chunk) => {
					body = Buffer.concat([body, chunk]);
				});

				res.on('end', () => {
					dhash(
						body,
						(err, hash) => {
							if(err) {
								return reject(err);
							}
							resolve(hash);
						},
						16
					);
				});

				res.on('error', (err) => {
					console.log(err);
					reject(err);
				});
			});
		});
	},
};
