import { Request, Response, NextFunction } from 'express';
import { verifyToken, JWTPayload } from '../utils/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);
    
    try {
      const payload = verifyToken(token);
      req.user = payload;
      
      // Verify user still exists and is active
      const user = await prisma.user.findUnique({
        where: { id: payload.userId }
      });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      if (!user.emailVerified) {
        return res.status(403).json({ error: 'Email not verified' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Authentication error' });
  }
};

export const requireTier = (minTier: 'free' | 'core' | 'full') => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const tierHierarchy = {
      free: 0,
      core: 1,
      full: 2
    };

    const userTierLevel = tierHierarchy[req.user.subscriptionTier as keyof typeof tierHierarchy] || 0;
    const requiredTierLevel = tierHierarchy[minTier];

    if (userTierLevel < requiredTierLevel) {
      return res.status(403).json({ 
        error: 'Insufficient subscription tier',
        requiredTier: minTier,
        currentTier: req.user.subscriptionTier
      });
    }

    next();
  };
};