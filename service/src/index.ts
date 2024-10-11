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

try {
  await redisClient.connect();
  console.log('Redis connected');
} catch (error) {
  console.error(error);
}

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

app.get('/api/set/:key', async (req: Request, res: Response) => {
  const { key }: { key?: string } = req.params;
  if (req.query && key) {
    await redisClient.set(key, JSON.stringify(req.query));
    res.send('success');
  } else {
    res.status(400).send('Bad request');
  }

});

app.get('/api/get/:key', async (req: Request, res: Response) => {
  const { key }: { key?: string } = req.params;
    const data = await redisClient.get(key);
    console.log(key, data)
    if (data) {
      res.send(JSON.parse(data));
    } else {
      res.status(404).send('Not found');
    }
});

app.use((req: Request, res: Response) => {
  res.status(404).send('Not found, bang');
});

app.listen(getEnv('BACKEND_PORT'), () => {
  console.log(`Server is running on port ${getEnv('BACKEND_PORT')}`);
});
