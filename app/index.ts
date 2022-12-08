import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { TypedRequest } from './types/TypedRequest';
import { sequelize } from './core/sequelize';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

interface User {
  name: string;
}

app.post('/', (req: TypedRequest<User>, res: Response) => {
  res.send(`Hello ${req.body.name}`)
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return;
  }
});
