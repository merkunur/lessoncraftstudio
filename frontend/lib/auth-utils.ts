import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-for-development';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-key-for-development';

interface TokenPayload {
  userId: string;
  email: string;
  subscriptionTier: string;
  isAdmin: boolean;
}

/**
 * Generate access and refresh tokens for a user
 */
export function generateTokens(user: User) {
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    subscriptionTier: user.subscriptionTier,
    isAdmin: user.isAdmin,
  };

  const accessTokenOptions: jwt.SignOptions = {
    expiresIn: process.env.SESSION_EXPIRY || '7d',
  };

  const refreshTokenOptions: jwt.SignOptions = {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '30d',
  };

  const accessToken = jwt.sign(payload, JWT_SECRET, accessTokenOptions);
  const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, refreshTokenOptions);

  return { accessToken, refreshToken };
}

/**
 * Verify an access token
 */
export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Verify a refresh token
 */
export function verifyRefreshToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as { userId: string };
  } catch (error) {
    return null;
  }
}

/**
 * Generate a secure random token
 */
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Generate a verification token
 */
export function generateVerificationToken(): string {
  return generateSecureToken(32);
}

/**
 * Generate a password reset token
 */
export function generatePasswordResetToken(): string {
  return generateSecureToken(32);
}

/**
 * Hash a token for storage
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Generate a secure password
 */
export function generateSecurePassword(length: number = 16): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  const randomValues = crypto.randomBytes(length);
  
  for (let i = 0; i < length; i++) {
    password += charset[randomValues[i] % charset.length];
  }
  
  return password;
}

/**
 * Check if a token has expired
 */
export function isTokenExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

/**
 * Get token expiry date
 */
export function getTokenExpiry(hours: number = 24): Date {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
}

/**
 * Extract bearer token from Authorization header
 */
export function extractBearerToken(authHeader: string | null): string | null {
  if (!authHeader) return null;
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
  
  return parts[1];
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}