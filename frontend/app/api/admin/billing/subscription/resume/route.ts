import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// POST /api/admin/billing/subscription/resume - Resume subscription
export async function POST(request: NextRequest) {
  try {
    // In production, resume subscription via Stripe API
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const subscription = await stripe.subscriptions.update(subscriptionId, {
    //   pause_collection: null
    // });

    // Mock resume for development
    const resumedSubscription = {
      id: 'sub_1',
      status: 'active',
      paused_until: null
    };

    return NextResponse.json({
      success: true,
      subscription: resumedSubscription,
      message: 'Subscription has been resumed'
    });
  } catch (error) {
    console.error('Failed to resume subscription:', error);
    return NextResponse.json(
      { error: 'Failed to resume subscription' },
      { status: 500 }
    );
  }
}