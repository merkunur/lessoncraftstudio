import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// POST /api/admin/billing/subscription/cancel - Cancel subscription
export async function POST(request: NextRequest) {
  try {
    // In production, cancel subscription via Stripe API
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const subscription = await stripe.subscriptions.update(subscriptionId, {
    //   cancel_at_period_end: true
    // });

    // Mock cancellation for development
    const canceledSubscription = {
      id: 'sub_1',
      status: 'active',
      cancel_at_period_end: true,
      canceled_at: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()
    };

    return NextResponse.json({
      success: true,
      subscription: canceledSubscription,
      message: 'Subscription will be canceled at the end of the current billing period'
    });
  } catch (error) {
    console.error('Failed to cancel subscription:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}