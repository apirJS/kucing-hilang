import { drizzle } from 'drizzle-orm/connect';
import { getEnv } from '../lib/utils';

async function main() {
  const db = await drizzle(
    'node-postgres',
    getEnv('BUN_ENV') === 'production'
      ? getEnv('DATABASE_URL')
      : 'postgres://postgres:postgres@localhost:5432/postgres'
  );
  return db;
}

const db = await main();
export default db;
