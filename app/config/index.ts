import dotenv from 'dotenv';

dotenv.config();

const endpoint = '/api/v1';

export const config = {
  FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN || 'http://localhost:9998',
  BACKEND_DOMAIN: process.env.BACKEND_DOMAIN || 'http://localhost:9999',
  PORT: process.env.PORT || 9999,
  API_ENDPOINT: endpoint,
  STATIC_ENDPOINT: endpoint + '/public',
  SOCKET_ENDPOINT: endpoint + '/socket.io',
};
