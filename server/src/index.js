import 'core-js/stable';
import 'regenerator-runtime/runtime';

import express from 'express';
import http from 'http';
import cors from 'cors';
import { config } from './configs/config';
import { combineRoutes } from './routes';
import { errorHandler } from './middlewares/errorHandling.middleware';
const app = express();
const server = http.Server(app);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
combineRoutes(app);

app.use(errorHandler);

server.listen(config.port, () => {
	console.log(`Example app listening at ${config.hostname}:${config.port}`);
});
