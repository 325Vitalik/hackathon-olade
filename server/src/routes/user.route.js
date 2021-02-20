import { Router } from 'express';
import { userService } from '../services/user.service';

const router = new Router();

router.get('/:uid', async (req, res, next) => {
	try {
		const uid = req.params.uid;
		const user = await userService.getUserDocument(uid);
		res.send(user);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { user, additionalData } = req.body;
		const userData = await userService.generateUserDocument(user, additionalData);
		res.send(userData);
	} catch (error) {
		next(error);
	}
});

export { router as userRoutes };
