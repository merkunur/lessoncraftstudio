import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // LOCKED: Always return default logo to prevent accidental overwrites
  // This ensures the correct LCS logo (67px/151px, no clipPath) is always used
  return NextResponse.json({
    logoUrl: '/logo-lcs.png',
    isDefault: true
  });
}