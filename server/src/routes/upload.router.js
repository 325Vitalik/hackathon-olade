import { Router } from 'express';
import multer from 'multer';
import {s3Client} from '../configs/config';
import { v4 as uuidv4 } from 'uuid'

var storage = multer.memoryStorage()
var upload = multer({ storage: storage });


const router = new Router();
router.post('/', upload.single("file"), (req, res) => {

	const params = {
		Bucket: 'pet-finder-lviv',
		Key: `${uuidv4()}.png`,
		Body: req.file.buffer,
		ACL: 'public-read'
	};

	s3Client.upload(params, (err, data) => {
		if (err) {
			res.status(500).json({ error: "Error -> " + err });
		}
		res.json({ link:data.Location });
	});
});

export { router as uploadRouter };