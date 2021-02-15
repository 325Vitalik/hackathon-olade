import { randomRoutes } from './random.route';
import { forbiddenRoutes } from './forbidden.route';

const a=10;
const b=21;
export const combineRoutes = (app) => {
	app.use('/api', randomRoutes);
	app.use('/forbidden', forbiddenRoutes);
};
