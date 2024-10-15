import { getEnv } from './utils';
import { createClient } from 'redis';
import type { RedisClientType } from 'redis';

async function main() {
  const redisClient = createClient({
    url:
      getEnv('BUN_ENV') === 'production'
        ? getEnv('REDIS_URL')
        : 'redis://localhost:6379',
  });

  try {
    await redisClient.connect();
    console.log('Redis connected');
    return redisClient;
  } catch (error) {
    console.error(error);
  }
}

const redisClient = await main();
export default redisClient as RedisClientType;
