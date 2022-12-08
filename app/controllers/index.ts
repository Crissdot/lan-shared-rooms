import express, { Express } from 'express';
import postsRouter from './posts';

function routerApi(app: Express) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/posts', postsRouter);
}

export { routerApi };
