import { NextRequest, NextResponse } from 'next/server';
import { CheckoutSession } from '@/types/stripe';

// POST /api/admin/billing/checkout - Create checkout session
export async function POST(request: NextRequest) {
  try {
    const { planId, successUrl, cancelUrl } = await request.json();

    // In production, create Stripe checkout session
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const session = await stripe.checkout.sessions.create({...});

    // Mock checkout session for development
    const checkoutSession: CheckoutSession = {
      id: 'checkout_1',
      stripeSessionId: 'cs_test_mock123',
      mode: 'subscription',
      successUrl: successUrl || '/admin/billing?success=true',
      cancelUrl: cancelUrl || '/admin/billing?canceled=true',
      lineItems: [
        {
          priceId: `price_${planId}`,
          quantity: 1
        }
      ],
      customerId: 'cus_mock123',
      customerEmail: 'user@example.com',
      metadata: {
        userId: 'user_1',
        planId
      },
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes
    };

    // Mock checkout URL
    const checkoutUrl = `https://checkout.stripe.com/c/pay/${checkoutSession.stripeSessionId}`;

    return NextResponse.json({
      sessionId: checkoutSession.stripeSessionId,
      checkoutUrl
    });
  } catch (error) {
    console.error('Failed to create checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}