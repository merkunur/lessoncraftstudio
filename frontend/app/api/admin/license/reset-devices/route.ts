import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/auth-middleware';
import { getDevicesForEmail, resetDevicesForEmail } from '@/lib/license-device-manager';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/license/reset-devices?email=...
 * Lists all registered devices for an email (admin only)
 */
export async function GET(request: NextRequest) {
  return withAdmin(request, async (req, _userId) => {
    const email = req.nextUrl.searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email query parameter is required' },
        { status: 400 }
      );
    }

    const devices = await getDevicesForEmail(email);

    return NextResponse.json({
      email,
      devices: devices.map((d: { id: string; ipAddress: string; userAgent: string | null; lastSeenAt: Date; createdAt: Date }) => ({
        id: d.id,
        ipAddress: d.ipAddress,
        userAgent: d.userAgent,
        lastSeenAt: d.lastSeenAt,
        createdAt: d.createdAt,
      })),
      count: devices.length,
    });
  });
}

/**
 * POST /api/admin/license/reset-devices
 * Resets all devices for an email (admin only)
 * Body: { email: string }
 */
export async function POST(request: NextRequest) {
  return withAdmin(request, async (req, _userId) => {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const deletedCount = await resetDevicesForEmail(email);

    return NextResponse.json({
      success: true,
      message: `Reset ${deletedCount} device(s) for ${email}`,
      deletedCount,
    });
  });
}
