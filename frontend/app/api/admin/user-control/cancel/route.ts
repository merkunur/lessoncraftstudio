import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';

export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/user-control/cancel
 * Stripe subscription cancellation - temporarily disabled during pivot
 */
export const POST = withAdmin(async (request: NextRequest, user) => {
  return NextResponse.json(
    { error: 'Stripe integration removed during pivot. Cancellations must be processed via Stripe dashboard directly.' },
    { status: 501 }
  );
});
