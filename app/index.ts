import express, { Express } from 'express';
import dotenv from 'dotenv';
import { setupSequelize } from './core/sequelize';
import { routerApi } from './controllers';
import { logErrors, httpErrorHandler, ormErrorHandler, errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
  return res.send('All fine!');
});

routerApi(app);

app.use(logErrors);
app.use(httpErrorHandler);
app.use(ormErrorHandler);
app.use(errorHandler);

app.listen(port, async () => {
  try {
    const sequelize = await setupSequelize();
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return;
  }
});
