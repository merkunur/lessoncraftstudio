import { NextRequest } from 'next/server';
import { verifyAccessToken, extractBearerToken } from './auth-utils';
import { prisma } from './prisma';

/**
 * Get current authenticated user from JWT token in Authorization header
 * Used in API routes to authenticate requests
 */
export async function getCurrentUser(request: NextRequest) {
  try {
    // Extract Authorization header
    const authHeader = request.headers.get('authorization');
    const token = extractBearerToken(authHeader);

    if (!token) {
      return null;
    }

    // Verify token
    const payload = verifyAccessToken(token);
    if (!payload) {
      return null;
    }

    // Check if session still exists in database (prevents revoked sessions from working)
    const session = await prisma.session.findFirst({
      where: {
        token: token,
        userId: payload.userId,
        expiresAt: {
          gt: new Date()  // Session not expired
        }
      }
    });

    if (!session) {
      // Session was revoked or doesn't exist
      return null;
    }

    // Get user from database with subscription
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        subscription: true,
      },
    });

    if (!user) {
      return null;
    }

    // Check if suspended
    if (user.isSuspended) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      subscriptionTier: user.subscriptionTier,
      subscriptionStatus: user.subscription?.status || 'inactive',
      stripeCustomerId: user.stripeCustomerId,
      isAdmin: user.isAdmin,
      emailVerified: user.emailVerified,
      language: user.language,
    };
  } catch (error) {
    console.error('getCurrentUser error:', error);
    return null;
  }
}

/**
 * Require authentication - returns user or throws 401 error
 */
export async function requireAuth(request: NextRequest) {
  const user = await getCurrentUser(request);

  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}

/**
 * Require admin access - returns user or throws 403 error
 */
export async function requireAdmin(request: NextRequest) {
  const user = await requireAuth(request);

  if (!user.isAdmin) {
    throw new Error('Forbidden - Admin access required');
  }

  return user;
}
