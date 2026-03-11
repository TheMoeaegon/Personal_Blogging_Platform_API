import type { Request, Response, NextFunction } from 'express';
import { handleVerifyToken, type ClaimsType } from '../../domains/auth/index.js';

export interface AuthenticatedRequest extends Request {
  user?: ClaimsType;
}

export async function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }
    const payload = await handleVerifyToken(token);
    req.user = payload;
    next();
  } catch (error: unknown) {
    console.error('Error validating token: ', error);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}
