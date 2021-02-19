import express from 'express';
import useSocket, { Socket } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { port } from './configs/config';
import { combineRoutes } from './routes';
import { errorHandler } from './middlewares/errorHandling.middleware';
const app = express();
const server = http.Server(app);
const sockets = useSocket(server,{cors:{origin:"*"}})

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

combineRoutes(app);

app.use(errorHandler);

sockets.on('connection', socket => {
	socket.on('button-clicked', () => {
		socket.broadcast.emit('message',{message:'Another client click button'})
   });
});

server.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
