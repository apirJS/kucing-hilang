import RedisStore from 'connect-redis';
import cors from 'cors';
import session from 'express-session';
import express, { type Request, type Response } from 'express';
import { createClient } from 'redis';
import { getEnv } from './lib/utils';

const app = express();
const redisClient = createClient({
  url: getEnv('REDIS_URL'),
});

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: getEnv('SESSION_SECRET_KEY'),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.BUN_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.get('/api', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/store/:key', async (req: Request, res: Response) => {
  const { key } = req.params;
  const { value } = req.query;

  await redisClient.set(key as string, value as string);
});

app.get('/api/get/:key',async (req: Request, res: Response) => {
  const { key } = req.params;

  await redisClient.get(key as string);
});

app.use((req: Request, res: Response) => {
  res.status(404).send('Not found, bang');
});

app.listen(getEnv('BACKEND_PORT'), () => {
  console.log(`Server is running on port ${getEnv('BACKEND_PORT')}`);
});
