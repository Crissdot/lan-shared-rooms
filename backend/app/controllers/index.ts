import express, { Express } from 'express';
import postsRouter from './posts';
import usersRouter from './users';
import authRouter from './auth';
import { config } from '../config';

function routerApi(app: Express) {
  const router = express.Router();
  app.use(config.API_ENDPOINT, router);
  router.use('/posts', postsRouter);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
}

export { routerApi };
