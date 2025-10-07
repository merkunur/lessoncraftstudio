import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from './auth';

/**
 * Get authenticated user from server component or API route
 */
export async function getAuthUser(request: NextRequest) {
  return await getCurrentUser(request);
}

/**
 * Require authentication - throw if not authenticated
 */
export async function requireAuth(request: NextRequest) {
  const user = await getAuthUser(request);

  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}

/**
 * Require admin - throw if not admin
 */
export async function requireAdmin(request: NextRequest) {
  const user = await requireAuth(request);

  if (!user.isAdmin) {
    throw new Error('Forbidden - Admin access required');
  }

  return user;
}

/**
 * Middleware helper for API routes
 */
export function withAuth(
  handler: (request: NextRequest, user: any, context?: any) => Promise<NextResponse>
) {
  return async (request: NextRequest, context?: any) => {
    const user = await getAuthUser(request);

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    return handler(request, user, context);
  };
}

export function withAdmin(
  handler: (request: NextRequest, user: any, context?: any) => Promise<NextResponse>
) {
  return async (request: NextRequest, context?: any) => {
    const user = await getAuthUser(request);

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    if (!user.isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    return handler(request, user, context);
  };
}
