import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/auth/active-sessions
 * Get all active sessions for the authenticated user
 *
 * Response:
 * - sessions: array of session objects with device info
 * - total: number of active sessions
 * - limit: maximum allowed sessions
 *
 * Auth: Requires authenticated user via JWT
 */
export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated using JWT
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    // Get current session token from Authorization header
    const authHeader = request.headers.get('authorization');
    const currentToken = authHeader?.replace('Bearer ', '');

    // Get all active sessions for this user
    const activeSessions = await prisma.session.findMany({
      where: {
        userId: user.id,
        expiresAt: { gt: new Date() },
      },
      orderBy: { lastActivityAt: 'desc' },
      select: {
        id: true,
        deviceId: true,
        deviceName: true,
        deviceType: true,
        browser: true,
        os: true,
        ipAddress: true,
        country: true,
        city: true,
        lastActivityAt: true,
        createdAt: true,
        token: true, // To identify current session
      },
    });

    // Format sessions for response
    const formattedSessions = activeSessions.map((s) => {
      const isCurrent = s.token === currentToken;

      return {
        id: s.id,
        deviceId: s.deviceId,
        deviceName: s.deviceName || 'Unknown Device',
        deviceType: s.deviceType || 'desktop',
        browser: s.browser || 'Unknown Browser',
        os: s.os || 'Unknown OS',
        ipAddress: s.ipAddress ? maskIP(s.ipAddress) : 'Unknown',
        location: formatLocation(s.city, s.country),
        lastActive: s.lastActivityAt,
        createdAt: s.createdAt,
        isCurrent,
        canRevoke: !isCurrent, // Can't revoke current session from API
      };
    });

    return NextResponse.json({
      sessions: formattedSessions,
      total: formattedSessions.length,
      limit: 1, // MAX_CONCURRENT_SESSIONS (single device policy)
      hasReachedLimit: formattedSessions.length >= 1,
    });

  } catch (error) {
    console.error('Active sessions fetch error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch active sessions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Helper: Mask IP address for privacy
 */
function maskIP(ip: string): string {
  if (!ip) return 'Unknown';

  // IPv4: Mask last octet
  if (ip.includes('.')) {
    const parts = ip.split('.');
    if (parts.length === 4) {
      parts[3] = 'xxx';
      return parts.join('.');
    }
  }

  // IPv6: Mask last segments
  if (ip.includes(':')) {
    const parts = ip.split(':');
    if (parts.length > 2) {
      parts[parts.length - 1] = 'xxxx';
      parts[parts.length - 2] = 'xxxx';
      return parts.join(':');
    }
  }

  return ip;
}

/**
 * Helper: Format city and country for display
 */
function formatLocation(city?: string | null, country?: string | null): string {
  if (city && country) {
    return `${city}, ${country}`;
  }
  if (country) {
    return country;
  }
  return 'Unknown Location';
}
