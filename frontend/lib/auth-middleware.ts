import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, extractBearerToken } from './auth-utils';

/**
 * Middleware to protect API routes that require authentication
 */
export async function withAuth(
  request: NextRequest,
  handler: (request: NextRequest, userId: string) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    const authHeader = request.headers.get('authorization');
    const token = extractBearerToken(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = verifyAccessToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Call the handler with the authenticated user ID
    return handler(request, payload.userId);
  } catch (error) {
    console.error('Auth middleware error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}

/**
 * Middleware to check if user is an admin
 */
export async function withAdmin(
  request: NextRequest,
  handler: (request: NextRequest, userId: string) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    const authHeader = request.headers.get('authorization');
    const token = extractBearerToken(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = verifyAccessToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    if (!payload.isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Call the handler with the authenticated admin user ID
    return handler(request, payload.userId);
  } catch (error) {
    console.error('Admin middleware error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}

/**
 * Middleware to check subscription tier
 */
export async function withSubscription(
  request: NextRequest,
  requiredTier: 'free' | 'core' | 'full',
  handler: (request: NextRequest, userId: string) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    const authHeader = request.headers.get('authorization');
    const token = extractBearerToken(authHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = verifyAccessToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Check subscription tier hierarchy
    const tierHierarchy = {
      free: 0,
      core: 1,
      full: 2,
    };

    const userTierLevel = tierHierarchy[payload.subscriptionTier as keyof typeof tierHierarchy] || 0;
    const requiredTierLevel = tierHierarchy[requiredTier];

    if (userTierLevel < requiredTierLevel) {
      return NextResponse.json(
        {
          error: 'Insufficient subscription tier',
          required: requiredTier,
          current: payload.subscriptionTier,
        },
        { status: 403 }
      );
    }

    // Call the handler with the authenticated user ID
    return handler(request, payload.userId);
  } catch (error) {
    console.error('Subscription middleware error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}

/**
 * Get user ID from request without enforcing authentication
 * Returns null if not authenticated
 */
export function getUserIdFromRequest(request: NextRequest): string | null {
  try {
    const authHeader = request.headers.get('authorization');
    const token = extractBearerToken(authHeader);

    if (!token) {
      return null;
    }

    const payload = verifyAccessToken(token);
    return payload?.userId || null;
  } catch (error) {
    return null;
  }
}