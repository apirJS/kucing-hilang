import { EnvirontmentVariables } from "../types";

export function getEnv(key: keyof EnvirontmentVariables): string {
  try {
    const value = Bun.env[key];
    return value as string
  } catch (error) {
    console.error(JSON.stringify(error))
    return ""
  }
}