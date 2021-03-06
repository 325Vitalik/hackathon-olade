import { randomRoutes } from './random.route';
import { forbiddenRoutes } from './forbidden.route';
import { userRoutes } from './user.route';
import { uploadRouter } from './upload.router';
import { authMiddleware } from '../middlewares/auth.middleware';
import { petRoutes } from './petRoutes.route';

export const combineRoutes = (app) => {
	app.use('/api', randomRoutes);
	app.use('/forbidden', forbiddenRoutes);
	app.use('/unauth', authMiddleware, forbiddenRoutes);
	app.use('/pet', authMiddleware, petRoutes);
	app.use('/user', userRoutes);
	app.use('/upload', uploadRouter)
};
