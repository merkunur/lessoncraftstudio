import { NextRequest, NextResponse } from 'next/server';

import { isLcsSubscriptionActive } from '@/lib/subscription-helpers';
import { requireStudioSubscriber } from '@/lib/studio/story-gate';

// Story Studio tenancy — auth/tier probe. The studio client calls this on
// boot in tenant mode; 401 → sign-in, subscribed:false → upsell state.

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const gate = await requireStudioSubscriber(request);
  if (gate instanceof NextResponse) return gate;
  return NextResponse.json({
    ok: true,
    studio: true,
    tenant: true,
    subscribed: isLcsSubscriptionActive(gate.user as any),
    isAdmin: !!gate.user.isAdmin,
  });
}
