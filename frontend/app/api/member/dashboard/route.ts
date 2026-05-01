import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth-middleware';
import { prisma } from '@/lib/prisma';
import { getAllAppIds } from '@/config/products';

export const dynamic = 'force-dynamic';

/**
 * GET /api/member/dashboard
 *
 * Admin-only as of Pass 8 (CLAUDE.md §17.2). Admins receive full access to the
 * 33 worksheet-generator apps; non-admins receive 403. Seller-era purchase reads
 * (purchases.appsAccess) were dropped — production purchases table is empty
 * (Pass 1 §8) and the new platform's subscriber surface is a separate component
 * not an evolution of this endpoint.
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

    if (user.isAdmin || user.email.toLowerCase() === 'admin@lessoncraftstudio.com') {
      return NextResponse.json({
        email: user.email,
        apps: getAllAppIds(),
      });
    }

    return NextResponse.json({ error: 'admin only' }, { status: 403 });
  });
}
