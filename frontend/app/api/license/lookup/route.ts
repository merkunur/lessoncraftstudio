/**
 * License Lookup API
 *
 * POST /api/license/lookup
 * Body: { email: string } or { licenseKey: string }
 *
 * Returns all active licenses and merged app access for an email.
 * Used by the member portal login flow.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getMergedAppAccess, getLicensesByEmail } from '@/lib/license-manager';
import { verifyLicenseKey } from '@/lib/license-manager';
import { licenseLookupLimiter } from '@/lib/rate-limiter';
import { getClientIP } from '@/lib/device-fingerprint-server';
import { checkAndRegisterDevice } from '@/lib/license-device-manager';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Rate limit by IP
    const clientIp = getClientIP(request) || 'unknown';
    const rateCheck = licenseLookupLimiter.check(clientIp);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, licenseKey } = body;

    // Lookup by license key
    if (licenseKey && typeof licenseKey === 'string') {
      const result = await verifyLicenseKey(licenseKey);
      if (!result.valid) {
        return NextResponse.json(
          { error: result.error ?? 'Invalid license key' },
          { status: 403 }
        );
      }

      // Device check
      const userAgent = request.headers.get('user-agent') || undefined;
      const deviceCheck = await checkAndRegisterDevice(result.email!, clientIp, userAgent);
      if (!deviceCheck.allowed) {
        return NextResponse.json({ error: deviceCheck.message }, { status: 403 });
      }

      // Get full access info for this email
      const access = await getMergedAppAccess(result.email!);

      return NextResponse.json({
        email: result.email,
        apps: access.apps,
        highestTier: access.highestTier,
        hasCommercialLicense: access.hasCommercialLicense,
        licenses: access.licenses.map(l => ({
          licenseKey: l.licenseKey,
          productId: l.productId,
          productTier: l.productTier,
          status: l.status,
          createdAt: l.createdAt,
          expiresAt: l.expiresAt,
        })),
      });
    }

    // Lookup by email
    if (email && typeof email === 'string') {
      const access = await getMergedAppAccess(email.toLowerCase().trim());

      if (access.licenses.length === 0) {
        return NextResponse.json(
          { error: 'No licenses found for this email' },
          { status: 404 }
        );
      }

      // Device check
      const userAgent2 = request.headers.get('user-agent') || undefined;
      const deviceCheck2 = await checkAndRegisterDevice(email.toLowerCase().trim(), clientIp, userAgent2);
      if (!deviceCheck2.allowed) {
        return NextResponse.json({ error: deviceCheck2.message }, { status: 403 });
      }

      return NextResponse.json({
        email: email.toLowerCase().trim(),
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
    }

    return NextResponse.json(
      { error: 'Either email or licenseKey is required' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('License lookup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Mask a license key for email-based lookups (security).
 * Shows first and last segments only: LCS-XXXXX-*****-*****-XXXXX
 */
function maskLicenseKey(key: string): string {
  const parts = key.split('-');
  if (parts.length !== 5) return key;
  return `${parts[0]}-${parts[1]}-*****-*****-${parts[4]}`;
}
