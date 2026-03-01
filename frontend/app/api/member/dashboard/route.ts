import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth-middleware';
import { prisma } from '@/lib/prisma';
import { getMergedAppAccess } from '@/lib/license-manager';

export const dynamic = 'force-dynamic';

/**
 * GET /api/member/dashboard
 * Returns the authenticated user's license-based access data.
 * Queries by userId (linked licenses) OR email (legacy unlinked licenses).
 */
export async function GET(request: NextRequest) {
  return withAuth(request, async (_req, userId) => {
    // Get user email for legacy license lookup
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get merged access across all active licenses for this email
    const access = await getMergedAppAccess(user.email);

    return NextResponse.json({
      email: user.email,
      apps: access.apps,
      highestTier: access.highestTier,
      hasCommercialLicense: access.hasCommercialLicense,
      licenses: access.licenses.map(l => ({
        licenseKey: maskLicenseKey(l.licenseKey),
        productId: l.productId,
        productTier: l.productTier,
        status: l.status,
        createdAt: l.createdAt,
        expiresAt: l.expiresAt,
      })),
    });
  });
}

function maskLicenseKey(key: string): string {
  // LCS-XXXXX-XXXXX-XXXXX-XXXXX → LCS-XXXXX-*****-*****-XXXXX
  const parts = key.split('-');
  if (parts.length === 5) {
    return `${parts[0]}-${parts[1]}-*****-*****-${parts[4]}`;
  }
  return key;
}
