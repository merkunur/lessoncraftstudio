import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import {
  hashPassword,
  verifyPassword,
  generateToken,
  generateRefreshToken,
  generateVerificationToken,
  generateResetToken
} from '../utils/auth';

const prisma = new PrismaClient();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, firstName, lastName, language } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters' });
      }

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
      }

      // Hash password
      const passwordHash = await hashPassword(password);

      // Create verification token
      const verificationToken = generateVerificationToken();

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          firstName,
          lastName,
          language: language || 'en',
          verificationToken,
          subscriptionTier: 'free'
        }
      });

      // Generate tokens
      const accessToken = generateToken({
        userId: user.id,
        email: user.email,
        subscriptionTier: user.subscriptionTier
      });

      res.status(201).json({
        message: 'User created successfully. Please verify your email.',
        userId: user.id,
        accessToken,
        verificationToken // In production, send this via email
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      // Find user
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Verify password
      const isValid = await verifyPassword(password, user.passwordHash);

      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check email verification
      if (!user.emailVerified) {
        return res.status(403).json({ 
          error: 'Please verify your email',
          verificationRequired: true 
        });
      }

      // Generate tokens
      const accessToken = generateToken({
        userId: user.id,
        email: user.email,
        subscriptionTier: user.subscriptionTier
      });

      const refreshToken = generateRefreshToken(user.id);

      // Create session
      await prisma.userSession.create({
        data: {
          userId: user.id,
          sessionId: refreshToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          ipAddress: req.ip || '',
          userAgent: req.headers['user-agent'] || ''
        }
      });

      res.json({
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          subscriptionTier: user.subscriptionTier,
          preferredLocale: user.preferredLocale
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;

      if (refreshToken) {
        // Invalidate session
        await prisma.userSession.updateMany({
          where: {
            sessionId: refreshToken
          },
          data: {
            isActive: false
          }
        });
      }

      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.params;

      // Find user with token
      const user = await prisma.user.findFirst({
        where: {
          verificationToken: token
        }
      });

      if (!user) {
        return res.status(404).json({ error: 'Invalid verification token' });
      }

      // Update user
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: true,
          verificationToken: null
        }
      });

      res.json({ message: 'Email verified successfully' });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        // Don't reveal if user exists
        return res.json({ message: 'If an account exists, a reset link has been sent' });
      }

      // Generate reset token
      const resetToken = generateResetToken();
      const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken,
          resetTokenExpires
        }
      });

      // In production, send email with reset link
      res.json({ 
        message: 'If an account exists, a reset link has been sent',
        resetToken // Remove in production
      });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({ error: 'Token and new password are required' });
      }

      if (newPassword.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters' });
      }

      // Find user with valid token
      const user = await prisma.user.findFirst({
        where: {
          resetToken: token,
          resetTokenExpires: {
            gte: new Date()
          }
        }
      });

      if (!user) {
        return res.status(404).json({ error: 'Invalid or expired reset token' });
      }

      // Hash new password
      const passwordHash = await hashPassword(newPassword);

      // Update user
      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordHash,
          resetToken: null,
          resetTokenExpires: null
        }
      });

      res.json({ message: 'Password reset successfully' });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();