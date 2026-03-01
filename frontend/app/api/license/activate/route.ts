import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth-middleware';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * POST /api/license/activate
 * Links a license key to the authenticated user's account.
 * Body: { licenseKey: string }
 */
export async function POST(request: NextRequest) {
  return withAuth(request, async (req, userId) => {
    const body = await req.json();
    const { licenseKey } = body;

    if (!licenseKey || typeof licenseKey !== 'string') {
      return NextResponse.json(
        { error: 'License key is required' },
        { status: 400 }
      );
    }

    const normalizedKey = licenseKey.trim().toUpperCase();

    // Find the license
    const license = await prisma.licenseKey.findUnique({
      where: { licenseKey: normalizedKey },
    });

    if (!license) {
      return NextResponse.json(
        { error: 'Invalid license key' },
        { status: 404 }
      );
    }

    if (license.status !== 'active') {
      return NextResponse.json(
        { error: `License is ${license.status}` },
        { status: 400 }
      );
    }

    // Check if already linked to a different user
    if (license.userId && license.userId !== userId) {
      return NextResponse.json(
        { error: 'This license key is already linked to another account' },
        { status: 409 }
      );
    }

    // Link to this user
    await prisma.licenseKey.update({
      where: { id: license.id },
      data: { userId },
    });

    return NextResponse.json({
      success: true,
      message: 'License activated and linked to your account',
      productId: license.productId,
      productTier: license.productTier,
    });
  });
}
