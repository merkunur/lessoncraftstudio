import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth-middleware';
import { prisma } from '@/lib/prisma';
import { getAllAppIds } from '@/config/products';

export const dynamic = 'force-dynamic';

/**
 * GET /api/member/dashboard
 * Returns the authenticated user's purchased apps.
 * Admin users get access to all apps.
 * Regular users: checks purchases by userId AND email.
 */
export async function GET(request: NextRequest) {
  return withAuth(request, async (_req, userId) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, isAdmin: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Admin override: full access to all apps
    if (user.isAdmin || user.email.toLowerCase() === 'admin@lessoncraftstudio.com') {
      return NextResponse.json({
        email: user.email,
        apps: getAllAppIds(),
      });
    }

    const email = user.email.toLowerCase().trim();
    const allApps = new Set<string>();

    // 1. Check Lemon Squeezy purchases by userId (most reliable)
    const purchasesByUser = await prisma.purchase.findMany({
      where: { userId, status: 'active' },
    });

    for (const purchase of purchasesByUser) {
      for (const app of purchase.appsAccess) {
        allApps.add(app);
      }
    }

    // 2. Check purchases by email (catches unlinked purchases)
    const purchasesByEmail = await prisma.purchase.findMany({
      where: { buyerEmail: email, status: 'active', userId: null },
    });

    for (const purchase of purchasesByEmail) {
      for (const app of purchase.appsAccess) {
        allApps.add(app);
      }
      // Auto-link unlinked purchases to this user
      await prisma.purchase.update({
        where: { id: purchase.id },
        data: { userId },
      });
    }

    return NextResponse.json({
      email: user.email,
      apps: Array.from(allApps),
    });
  });
}
