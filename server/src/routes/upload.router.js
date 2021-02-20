import { Router } from 'express';
import multer from 'multer';
import s3 from '../configs/s3.config.js';
import { v4 as uuidv4 } from 'uuid'

var storage = multer.memoryStorage()
var upload = multer({storage: storage});

 
const router = new Router();
router.post('/', upload.single("file"), (req, res) => {
	const s3Client = s3.s3Client;
	const params = s3.uploadParams;
	
	params.Key = `${uuidv4()}.png`;
	params.Body = req.file.buffer;
		
	s3Client.upload(params, (err, data) => {
		if (err) {
			res.status(500).json({error:"Error -> " + err});
		}
		res.json({message: `File uploaded successfully! -> keyname = ${data.Location}`});
	});
});
 
export { router as uploadRouter };