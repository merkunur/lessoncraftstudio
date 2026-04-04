import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken, extractBearerToken } from '@/lib/auth-utils';

export const dynamic = 'force-dynamic';

/**
 * POST /api/verify-app-access
 *
 * Verifies that the authenticated user has purchased a specific app.
 * Called by worksheet generator HTML apps before removing watermark.
 *
 * Session limiting applies to ALL users including admin.
 * Admin bypasses purchase checks only (full app access).
 *
 * Body: { appId: string }
 * Headers: Authorization: Bearer <accessToken>, X-Device-Id: <deviceId>
 *
 * Returns: { hasAccess: boolean }
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Extract and verify JWT token
    const token = extractBearerToken(request.headers.get('authorization'));
    if (!token) {
      return NextResponse.json({ hasAccess: false }, { status: 200 });
    }

    const decoded = verifyAccessToken(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ hasAccess: false }, { status: 200 });
    }

    // 2. Extract appId from body
    const body = await request.json();
    const appId = body.appId;
    if (!appId || typeof appId !== 'string') {
      return NextResponse.json({ hasAccess: false }, { status: 200 });
    }

    const userId = decoded.userId;

    // 3. Verify session exists in database (ALL users including admin)
    const session = await prisma.session.findFirst({
      where: {
        token: token,
        userId,
        expiresAt: { gt: new Date() },
      },
    });
    if (!session) {
      return NextResponse.json({ hasAccess: false, error: 'session_expired' }, { status: 200 });
    }

    // 4. Check device ID matches (ALL users including admin)
    const requestDeviceId = request.headers.get('x-device-id');
    if (requestDeviceId && session.deviceId && requestDeviceId !== session.deviceId) {
      return NextResponse.json({ hasAccess: false, error: 'session_expired' }, { status: 200 });
    }

    // 5. Update lastActivityAt (ALL users including admin)
    await prisma.session.update({
      where: { id: session.id },
      data: { lastActivityAt: new Date() },
    });

    // 6. Admin override: bypasses purchase checks only (not session/device checks)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, isAdmin: true },
    });

    if (user && (user.isAdmin || user.email.toLowerCase() === 'admin@lessoncraftstudio.com')) {
      return NextResponse.json({ hasAccess: true }, { status: 200 });
    }

    // 7. Check purchases by userId (non-admin only)
    const purchases = await prisma.purchase.findMany({
      where: { userId, status: 'active' },
      select: { appsAccess: true },
    });

    for (const purchase of purchases) {
      if (purchase.appsAccess.includes(appId)) {
        return NextResponse.json({ hasAccess: true }, { status: 200 });
      }
    }

    // 8. Check by email - catches unlinked purchases (non-admin only)
    if (user) {
      const emailPurchases = await prisma.purchase.findMany({
        where: { buyerEmail: user.email.toLowerCase().trim(), status: 'active', userId: null },
        select: { appsAccess: true },
      });

      for (const purchase of emailPurchases) {
        if (purchase.appsAccess.includes(appId)) {
          return NextResponse.json({ hasAccess: true }, { status: 200 });
        }
      }
    }

    return NextResponse.json({ hasAccess: false }, { status: 200 });
  } catch (error) {
    console.error('verify-app-access error:', error);
    return NextResponse.json({ hasAccess: false }, { status: 200 });
  }
}
