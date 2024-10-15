import type { Request, Response, NextFunction } from 'express';
import { getEnv } from './utils';
import jwt from 'jsonwebtoken'

export function authenticateAccessToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, getEnv('ACCESS_TOKEN_SECRET'), (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}
