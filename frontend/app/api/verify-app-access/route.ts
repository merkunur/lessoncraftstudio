import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken, extractBearerToken } from '@/lib/auth-utils';

export const dynamic = 'force-dynamic';

/**
 * POST /api/verify-app-access
 *
 * Verifies that the authenticated user has admin access to the 33 worksheet-generator
 * apps. Called by REFERENCE TRANSLATIONS/access-guard.js before removing the watermark.
 *
 * Admin-only as of Pass 8 (CLAUDE.md §17.2 — "33 apps now accessed only through admin
 * authentication"). Seller-era purchase-based access checks (purchases.appsAccess) were
 * dropped — production purchases table is empty (Pass 1 §8) and the apps are admin
 * tooling in the new platform.
 *
 * Session limiting applies to ALL users including admin.
 *
 * Body: { appId: string }   (kept for backwards compatibility with access-guard.js)
 * Headers: Authorization: Bearer <accessToken>
 *
 * Returns: { hasAccess: boolean }
 */
export async function POST(request: NextRequest) {
  try {
    const token = extractBearerToken(request.headers.get('authorization'));
    if (!token) {
      return NextResponse.json({ hasAccess: false }, { status: 200 });
    }

    const decoded = verifyAccessToken(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ hasAccess: false }, { status: 200 });
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
      return NextResponse.json({ hasAccess: false, error: 'session_expired' }, { status: 200 });
    }

    await prisma.session.update({
      where: { id: session.id },
      data: { lastActivityAt: new Date() },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, isAdmin: true },
    });

    if (user && (user.isAdmin || user.email.toLowerCase() === 'admin@lessoncraftstudio.com')) {
      return NextResponse.json({ hasAccess: true }, { status: 200 });
    }

    return NextResponse.json({ hasAccess: false }, { status: 200 });
  } catch (error) {
    console.error('verify-app-access error:', error);
    return NextResponse.json({ hasAccess: false }, { status: 200 });
  }
}
