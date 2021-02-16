import express from 'express';
import cors from 'cors';
import { port } from './configs/config';
import { combineRoutes } from './routes';
import { errorHandler } from './middlewares/errorHandling.middleware';
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

combineRoutes(app);

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
