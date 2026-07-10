import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken, extractBearerToken } from '@/lib/auth-utils';
import { isSubscriptionUsable } from '@/lib/entitlements';

export const dynamic = 'force-dynamic';

/**
 * POST /api/verify-app-access
 *
 * The tier oracle for the static worksheet-generator pages. Called by
 * access-guard.js (admin-controls reveal — `hasAccess` stays STRICTLY admin
 * for back-compat: #exportToCatalogBtn is operator tooling) and by
 * worksheet-host.js (the subscriber "Save interactive worksheet" flow —
 * 2026-07 subscription launch).
 *
 * Session limiting applies to ALL users including admin.
 *
 * Body: { appId: string }   (kept for backwards compatibility)
 * Headers: Authorization: Bearer <accessToken>
 *
 * Returns: {
 *   hasAccess: boolean,                 // ADMIN-ONLY semantic (unchanged)
 *   tier: 'anonymous'|'free'|'subscriber'|'admin',
 *   features: { saveInteractive: boolean }
 * }
 */
const ANON = { hasAccess: false, tier: 'anonymous', features: { saveInteractive: false } };
export async function POST(request: NextRequest) {
  try {
    const token = extractBearerToken(request.headers.get('authorization'));
    if (!token) {
      return NextResponse.json(ANON, { status: 200 });
    }

    const decoded = verifyAccessToken(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json(ANON, { status: 200 });
    }

    const userId = decoded.userId;

    const session = await prisma.session.findFirst({
      where: {
        token: token,
        userId,
        expiresAt: { gt: new Date() },
      },
    });
    if (!session) {
      return NextResponse.json({ ...ANON, error: 'session_expired' }, { status: 200 });
    }

    await prisma.session.update({
      where: { id: session.id },
      data: { lastActivityAt: new Date() },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        isAdmin: true,
        subscription: {
          select: {
            status: true,
            lsSubscriptionId: true,
            pastDueAt: true,
            currentPeriodEnd: true,
          },
        },
      },
    });
    if (!user) {
      return NextResponse.json(ANON, { status: 200 });
    }

    const isAdmin = user.isAdmin || user.email.toLowerCase() === 'admin@lessoncraftstudio.com';
    const subscriber = isSubscriptionUsable({ isAdmin, subscription: user.subscription });
    const tier = isAdmin ? 'admin' : subscriber ? 'subscriber' : 'free';

    return NextResponse.json(
      {
        hasAccess: isAdmin, // back-compat: admin-controls reveal only
        tier,
        features: { saveInteractive: subscriber },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('verify-app-access error:', error);
    return NextResponse.json(ANON, { status: 200 });
  }
}
