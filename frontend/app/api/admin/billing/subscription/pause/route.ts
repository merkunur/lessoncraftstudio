import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// POST /api/admin/billing/subscription/pause - Pause subscription
export async function POST(request: NextRequest) {
  try {
    const { pauseUntil } = await request.json();

    // In production, pause subscription via Stripe API
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const subscription = await stripe.subscriptions.update(subscriptionId, {
    //   pause_collection: {
    //     behavior: 'void',
    //     resumes_at: pauseUntil
    //   }
    // });

    // Mock pause for development
    const pausedSubscription = {
      id: 'sub_1',
      status: 'paused',
      paused_until: pauseUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    return NextResponse.json({
      success: true,
      subscription: pausedSubscription,
      message: 'Subscription has been paused'
    });
  } catch (error) {
    console.error('Failed to pause subscription:', error);
    return NextResponse.json(
      { error: 'Failed to pause subscription' },
      { status: 500 }
    );
  }
}