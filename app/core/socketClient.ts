import { io } from 'socket.io-client';
import { config } from '../config';

const createSocketClient = () => {
  const socket = io(config.BACKEND_DOMAIN, {
    path: config.SOCKET_ENDPOINT
  });

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  return socket;
}


export { createSocketClient };
