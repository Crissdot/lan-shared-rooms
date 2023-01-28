import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import { Server } from 'socket.io';
import { setupSequelize } from './core/sequelize';
import { routerApi } from './controllers';
import { logErrors, httpErrorHandler, ormErrorHandler, errorHandler } from './middlewares/errorHandler';
import { config } from './config';
import { SOCKET_NAMES } from './constants/sockets';

const app: Express = express();

app.use(express.json());

const whitelist = [config.FRONTEND_DOMAIN, 'http://localhost:9998'];
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

const server = app.listen(config.PORT, async () => {
  try {
    const sequelize = await setupSequelize();
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    console.log(`⚡️[server]: Server is running at http://localhost:${config.PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return;
  }
});

const io = new Server(server, {
  cors: {
    origin: [config.FRONTEND_DOMAIN ?? '', 'http://localhost:9998'],
    methods: ['GET'],
  },
});

let usersCount = 0;

io.on('connection', (socket) => {
  console.log('A user connected');
  usersCount++;
  io.emit(SOCKET_NAMES.countUpdated, {count: usersCount});

  socket.on(SOCKET_NAMES.newPost, (post) => {
    console.log(SOCKET_NAMES.newPost, post);
    io.emit(SOCKET_NAMES.newPost, post);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    usersCount--;
    io.emit(SOCKET_NAMES.countUpdated, {count: usersCount});
  });
});
