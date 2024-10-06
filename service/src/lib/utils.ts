import type { EnvirontmentVariables } from './types.d';

export function getEnv(key: keyof EnvirontmentVariables, isNumber?: boolean): string {
  try {
    const value = Bun.env[key];
    return value as string;
  } catch (e) {
    console.error('Variable not defined');
    return '';
  }
}
