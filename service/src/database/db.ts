import { drizzle } from 'drizzle-orm/connect';
import { getEnv } from '../lib/utils';

async function main() {
  const db = await drizzle('node-postgres', getEnv('DATABASE_URL'));
  return db
}

const db = await main();
export default db;