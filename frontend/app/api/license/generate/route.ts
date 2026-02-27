/**
 * License Generation API (Admin Only)
 *
 * POST /api/license/generate
 * Body: { email, productId, productTier, firstName?, lastName?, source?, maxActivations? }
 *
 * Used by:
 * - Admin panel to manually create licenses
 * - Direct sales (bypassing WarriorPlus)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { generateLicenseKey } from '@/lib/license-manager';
import type { LicenseTier, LicenseSource } from '@/lib/license-manager';
import { WPLUS_PRODUCTS } from '@/config/warriorplus-products';

export const dynamic = 'force-dynamic';

const VALID_TIERS: LicenseTier[] = ['single-app', 'category-bundle', 'full-access', 'commercial', 'agency', 'pro-features'];
const VALID_SOURCES: LicenseSource[] = ['warriorplus', 'gumroad', 'direct'];

export async function POST(request: NextRequest) {
  try {
    // Admin authentication required
    const user = await getCurrentUser(request);
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized - admin access required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      email,
      productId,
      productTier,
      firstName,
      lastName,
      source = 'direct',
      maxActivations = 3,
      transactionId,
    } = body;

    // Validate required fields
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!productId || typeof productId !== 'string') {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    if (!productTier || !VALID_TIERS.includes(productTier)) {
      return NextResponse.json(
        { error: `Invalid product tier. Must be one of: ${VALID_TIERS.join(', ')}` },
        { status: 400 }
      );
    }

    if (source && !VALID_SOURCES.includes(source)) {
      return NextResponse.json(
        { error: `Invalid source. Must be one of: ${VALID_SOURCES.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate product exists
    if (!WPLUS_PRODUCTS[productId]) {
      return NextResponse.json(
        { error: `Unknown product ID: ${productId}` },
        { status: 400 }
      );
    }

    const license = await generateLicenseKey({
      email,
      firstName,
      lastName,
      productId,
      productTier,
      source,
      transactionId,
      maxActivations,
    });

    return NextResponse.json({
      success: true,
      license,
    });
  } catch (error: any) {
    console.error('License generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate license key' },
      { status: 500 }
    );
  }
}
