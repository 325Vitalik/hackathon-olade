import io from 'socket.io-client';
import { config } from './config';

const sockets = io(`${config.hostname}/socket.io`);
export default sockets;