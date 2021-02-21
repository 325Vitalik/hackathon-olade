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
		const { user } = req.body;
		const userData = await userService.generateUserDocument(user);
		res.send(userData);
	} catch (error) {
		next(error);
	}
});

router.post('/update', async (req, res, next) => {
	try {
		const { user } = req.body;
		await userService.updateUserDocument(user);
		res.send();
	} catch (error) {
	console.log(error)
		next(error);
	}
});

export { router as userRoutes };
