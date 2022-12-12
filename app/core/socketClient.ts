import { Manager } from 'socket.io-client';

const createSocketClient = () => {
  const manager = new Manager('ws://localhost:9999/api/v1');
  const socket = manager.socket('/');

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  return socket;
}


export { createSocketClient };
