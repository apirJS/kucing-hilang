export interface EnvirontmentVariables {
  SESSION_SECRET_KEY: string
  REDIS_URL:string
  port: number
}

declare module 'bun' {
  interface Env extends EnvirontmentVariables {}
}