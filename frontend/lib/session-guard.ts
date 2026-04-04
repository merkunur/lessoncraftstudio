import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, extractBearerToken } from './auth-utils';
import { prisma } from './prisma';

/**
 * Session guard for active actions (worksheet generation, PDF download).
 *
 * Validates that:
 * 1. The JWT token is valid
 * 2. A matching session exists in the database
 * 3. The device ID matches (if provided)
 *
 * Returns 401 with error='session_expired' if the session was invalidated
 * (e.g., user logged in on another device).
 *
 * This is SEPARATE from withAuth — only used for active/protected actions,
 * not for passive browsing or dashboard viewing.
 */
export async function withSessionGuard(
  request: NextRequest,
  handler: (request: NextRequest, userId: string) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    const token = extractBearerToken(request.headers.get('authorization'));
    if (!token) {
      return NextResponse.json(
        { error: 'session_expired', message: 'Authentication required.' },
        { status: 401 }
      );
    }

    const decoded = verifyAccessToken(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { error: 'session_expired', message: 'Invalid token.' },
        { status: 401 }
      );
    }

    // Check session exists in database
    const session = await prisma.session.findFirst({
      where: {
        token,
        userId: decoded.userId,
        expiresAt: { gt: new Date() },
      },
    });

    if (!session) {
      return NextResponse.json(
        { error: 'session_expired', message: 'Your session has ended because your account is now active on another device.' },
        { status: 401 }
      );
    }

    // Check device ID matches (if header provided)
    const requestDeviceId = request.headers.get('x-device-id');
    if (requestDeviceId && session.deviceId && requestDeviceId !== session.deviceId) {
      return NextResponse.json(
        { error: 'session_expired', message: 'Device mismatch. Your session has ended.' },
        { status: 401 }
      );
    }

    // Update lastActivityAt
    await prisma.session.update({
      where: { id: session.id },
      data: { lastActivityAt: new Date() },
    });

    return handler(request, decoded.userId);
  } catch (error) {
    console.error('Session guard error:', error);
    return NextResponse.json(
      { error: 'session_expired', message: 'Authentication failed.' },
      { status: 401 }
    );
  }
}
