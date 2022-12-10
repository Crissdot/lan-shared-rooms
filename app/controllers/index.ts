import express, { Express } from 'express';
import postsRouter from './posts';
import usersRouter from './users';

function routerApi(app: Express) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/posts', postsRouter);
  router.use('/users', usersRouter);
}

export { routerApi };
