import RedisStore from 'connect-redis';
import cors from 'cors';
import session from 'express-session';
import express, { type Request, type Response } from 'express';
import redisClient from './lib/redisClient';
import { getEnv } from './lib/utils';
import morgan from 'morgan';

console.log(`app is running in ${getEnv('BUN_ENV')} mode`);

const app = express();
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(morgan('tiny'));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: getEnv('SESSION_SECRET_KEY'),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: getEnv('BUN_ENV') === 'production',
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.get('/api', (_, res) => {
  res.send('Hello :D!');
});

app.use((_: Request, res: Response) => {
  res.status(404).send('404, Not found');
});

app.listen(getEnv('BACKEND_PORT'), () => {
  console.log(`Server is running on port ${getEnv('BACKEND_PORT')}`);
});
