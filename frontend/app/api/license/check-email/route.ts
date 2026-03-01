import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { licenseCheckEmailLimiter } from '@/lib/rate-limiter';
import { getClientIP } from '@/lib/device-fingerprint-server';

export const dynamic = 'force-dynamic';

/**
 * POST /api/license/check-email
 * Checks if an account exists for the given email.
 * Rate-limited, no auth required.
 * Body: { email: string }
 */
export async function POST(request: NextRequest) {
  // Rate limit by IP
  const ip = getClientIP(request) || 'unknown';
  const rateCheck = licenseCheckEmailLimiter.check(ip);

  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(rateCheck.resetIn / 1000)) } }
    );
  }

  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true },
    });

    return NextResponse.json({ exists: !!user });
  } catch (error) {
    console.error('Check email error:', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}
