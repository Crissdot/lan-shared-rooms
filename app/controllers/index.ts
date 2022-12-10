import express, { Express } from 'express';
import postsRouter from './posts';
import usersRouter from './users';
import authRouter from './auth';

function routerApi(app: Express) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/posts', postsRouter);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
}

export { routerApi };
