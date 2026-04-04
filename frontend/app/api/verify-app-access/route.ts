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
 * Body: { appId: string }
 * Headers: Authorization: Bearer <accessToken>
 *
 * Returns: { hasAccess: boolean }
 */
export async function POST(request: NextRequest) {
  try {
    // Extract and verify token
    const token = extractBearerToken(request.headers.get('authorization'));
    if (!token) {
      return NextResponse.json({ hasAccess: false }, { status: 200 });
    }

    const decoded = verifyAccessToken(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ hasAccess: false }, { status: 200 });
    }

    // Extract appId from body
    const body = await request.json();
    const appId = body.appId;
    if (!appId || typeof appId !== 'string') {
      return NextResponse.json({ hasAccess: false }, { status: 200 });
    }

    const userId = decoded.userId;

    // Admin override: full access to all apps
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, isAdmin: true },
    });

    if (user && (user.isAdmin || user.email.toLowerCase() === 'admin@lessoncraftstudio.com')) {
      return NextResponse.json({ hasAccess: true }, { status: 200 });
    }

    // Check purchases by userId
    const purchases = await prisma.purchase.findMany({
      where: { userId, status: 'active' },
      select: { appsAccess: true },
    });

    for (const purchase of purchases) {
      if (purchase.appsAccess.includes(appId)) {
        return NextResponse.json({ hasAccess: true }, { status: 200 });
      }
    }

    // Also check by email (catches unlinked purchases)
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
