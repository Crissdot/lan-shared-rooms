import dotenv from 'dotenv';

dotenv.config();

const backendPort = process.env.PORT || 3000;

export const config = {
  PORT: backendPort,
  FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN || 'http://localhost:3001',
  BACKEND_DOMAIN: process.env.BACKEND_DOMAIN || 'http://localhost:' + backendPort,
};
