import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';
import { Server } from 'socket.io';
import { setupSequelize } from './core/sequelize';
import { routerApi } from './controllers';
import { logErrors, httpErrorHandler, ormErrorHandler, errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

const whitelist = ['http://localhost:9998'];
const options: CorsOptions = {
  origin: (requestOrigin, callback) => {
    if(!requestOrigin || whitelist.includes(requestOrigin)) {
      callback(null, true);
    } else {
      callback(new Error('You shall not pass'));
    }
  },
}
app.use(cors(options));

app.get('/', (req, res) => {
  return res.send('All fine!');
});

app.use('/public', express.static('uploads'));

routerApi(app);

app.use(logErrors);
app.use(httpErrorHandler);
app.use(ormErrorHandler);
app.use(errorHandler);

const server = app.listen(port, async () => {
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

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:9998',
    methods: ['GET'],
  },
});

let usersCount = 0;

io.on('connection', (socket) => {
  console.log('A user connected');
  usersCount++;
  io.emit('count_updated', {count: usersCount});

  socket.on('new_post', (post) => {
    console.log('New post', post);
    io.emit('new_post', post);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    usersCount--;
    io.emit('count_updated', {count: usersCount});
  });
});
