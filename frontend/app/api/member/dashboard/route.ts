import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth-middleware';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET /api/member/dashboard
 * Returns the authenticated user's purchased apps.
 * Checks both new Purchase records (Lemon Squeezy) and legacy LicenseKey records.
 */
export async function GET(request: NextRequest) {
  return withAuth(request, async (_req, userId) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const email = user.email.toLowerCase().trim();
    const allApps = new Set<string>();

    // 1. Check Lemon Squeezy purchases
    const purchases = await prisma.purchase.findMany({
      where: { buyerEmail: email, status: 'active' },
      orderBy: { createdAt: 'desc' },
    });

    for (const purchase of purchases) {
      for (const app of purchase.appsAccess) {
        allApps.add(app);
      }
    }

    // 2. Check legacy license keys (backward compatibility)
    const licenses = await prisma.licenseKey.findMany({
      where: { email, status: 'active' },
    });

    for (const license of licenses) {
      for (const app of license.appsAccess) {
        allApps.add(app);
      }
    }

    return NextResponse.json({
      email: user.email,
      apps: Array.from(allApps),
    });
  });
}
