export interface EnvirontmentVariables {
  REDIS_URL: string;
  REDIS_PASSWORD: string;
  SESSION_SECRET_KEY: string;
  BACKEND_PORT: number;
  REDIS_PASSWORD: string;

  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  PG_DATA: string;

  DATABASE_URL: string;
  BUN_ENV: string;
}

declare module 'bun' {
  interface Env extends EnvirontmentVariables {}
}
