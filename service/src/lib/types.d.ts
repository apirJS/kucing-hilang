import type { JwtPayload } from "jsonwebtoken";

export interface EnvirontmentVariables {
  REDIS_URL: string;
  SESSION_SECRET_KEY: string;
  BACKEND_PORT: number;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;

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

declare module 'express' { 
  export interface Request {
    user?: string | JwtPayload | undefined
  }
}
