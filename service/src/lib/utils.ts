import redisClient from './redisClient';
import type { EnvirontmentVariables } from './types.d';
import jwt from 'jsonwebtoken';

export function getEnv(key: keyof EnvirontmentVariables): string {
  try {
    const value = Bun.env[key];
    return value as string;
  } catch (e) {
    console.error('Variable not defined');
    return '';
  }
}


const ACCESS_TOKEN_SECRET = getEnv('ACCESS_TOKEN_SECRET');
const REFRESH_TOKEN_SECRET = getEnv('REFRESH_TOKEN_SECRET');
const REDIS_REFRESH_TOKEN_PREFIX = 'refresh_token:';

export function generateAccessToken(user: { id: string; email: string }) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

export function generateRefreshToken(user: { id: string; email: string }) {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
}

export async function storeRefreshToken(userId: string, token: string) {
  await redisClient.set(`${REDIS_REFRESH_TOKEN_PREFIX}${userId}`, token, { EX: 60 * 60 * 24 * 30 });
}

export async function verifyRefreshToken(userId: string, token: string) {
  const storedToken = await redisClient.get(`${REDIS_REFRESH_TOKEN_PREFIX}${userId}`);
  if (storedToken !== token) throw new Error('Invalid refresh token');
  return true;
}

export async function deleteRefreshToken(userId: string) {
  await redisClient.del(`${REDIS_REFRESH_TOKEN_PREFIX}${userId}`);
}
