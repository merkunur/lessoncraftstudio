/**
 * License Verification API
 *
 * POST /api/license/verify
 * Body: { licenseKey: string, appId?: string }
 *
 * Used by:
 * - Worksheet generator apps to validate access
 * - Member portal to check license status
 * - Nginx auth_request subrequests for image library access
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyLicenseKey } from '@/lib/license-manager';
import { checkAndRegisterDevice } from '@/lib/license-device-manager';
import { getClientIP } from '@/lib/device-fingerprint-server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { licenseKey, appId } = body;

    if (!licenseKey || typeof licenseKey !== 'string') {
      return NextResponse.json(
        { valid: false, error: 'License key is required' },
        { status: 400 }
      );
    }

    // Get client IP for usage tracking
    const clientIp = getClientIP(request) || undefined;

    const result = await verifyLicenseKey(licenseKey, appId, clientIp);

    if (!result.valid) {
      return NextResponse.json(result, { status: 403 });
    }

    // Device check after successful verification
    if (result.email && clientIp) {
      const userAgent = request.headers.get('user-agent') || undefined;
      const deviceCheck = await checkAndRegisterDevice(result.email, clientIp, userAgent);
      if (!deviceCheck.allowed) {
        return NextResponse.json(
          { valid: false, error: deviceCheck.message },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('License verification error:', error);
    return NextResponse.json(
      { valid: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
