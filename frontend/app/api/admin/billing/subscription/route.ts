import { NextRequest, NextResponse } from 'next/server';
import { Subscription } from '@/types/stripe';

// GET /api/admin/billing/subscription - Get current subscription
export async function GET(request: NextRequest) {
  try {
    // Mock subscription data for development
    const subscription: Subscription = {
      id: 'sub_1',
      userId: 'user_1',
      stripeSubscriptionId: 'sub_mock123',
      stripeCustomerId: 'cus_mock123',
      planId: 'plan_professional',
      status: 'active',
      currentPeriodStart: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      currentPeriodEnd: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      cancelAtPeriodEnd: false,
      metadata: {
        worksheetsUsed: 45,
        storageUsed: 2.3,
        lastActivity: new Date().toISOString()
      }
    };

    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Failed to get subscription:', error);
    return NextResponse.json(
      { error: 'Failed to get subscription' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/billing/subscription - Update subscription
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // In production, update subscription via Stripe API
    console.log('Updating subscription:', body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update subscription:', error);
    return NextResponse.json(
      { error: 'Failed to update subscription' },
      { status: 500 }
    );
  }
}