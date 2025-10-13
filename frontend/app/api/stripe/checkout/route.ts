import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getCurrentUser } from '@/lib/auth';
import { getOrCreateStripeCustomer, createCheckoutSession } from '@/lib/stripe-server';
import { SUBSCRIPTION_TIERS } from '@/lib/stripe-config';
import { MOCK_MODE_ENABLED, createMockCheckoutSession, getMockCustomerId } from '@/lib/stripe-mock';
import { mapToStripeLocale } from '@/lib/locale-utils';

export const dynamic = 'force-dynamic';

// POST /api/stripe/checkout - Create a checkout session
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate request body
    const checkoutSchema = z.object({
      tier: z.enum(['CORE', 'FULL']),
      billingInterval: z.enum(['monthly', 'yearly']).optional().default('monthly'),
      successUrl: z.string().url().optional(),
      cancelUrl: z.string().url().optional(),
      locale: z.string().optional().default('en'),
    });

    const body = await request.json();
    const validationResult = checkoutSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { tier, billingInterval, successUrl, cancelUrl, locale } = validationResult.data;

    // Get subscription tier details
    const tierInfo = SUBSCRIPTION_TIERS[tier];

    // Select correct price ID based on billing interval
    const priceId = billingInterval === 'yearly' ? tierInfo.priceIdYearly : tierInfo.priceIdMonthly;

    if (!priceId) {
      return NextResponse.json(
        { error: 'Invalid subscription tier or billing interval' },
        { status: 400 }
      );
    }

    // Check if user already has an active subscription
    if (user.subscriptionStatus === 'active' && user.subscriptionTier !== 'free') {
      return NextResponse.json(
        { 
          error: 'You already have an active subscription', 
          suggestion: 'Please use the billing portal to manage your subscription' 
        },
        { status: 400 }
      );
    }

    // Check if mock mode is enabled (invalid/missing Stripe keys)
    if (MOCK_MODE_ENABLED) {
      console.log('⚠️  MOCK MODE ENABLED - Using simulated Stripe checkout');
      console.log('💡 To use real Stripe, set valid STRIPE_SECRET_KEY in .env.local');

      // Use mock customer ID
      let customerId = user.stripeCustomerId || getMockCustomerId(user.id);

      // Save mock customer ID if not exists
      if (!user.stripeCustomerId) {
        const { prisma } = await import('@/lib/prisma');
        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customerId },
        });
      }

      // Create mock checkout session
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const session = await createMockCheckoutSession(
        customerId,
        priceId,
        user.id,
        tier,
        billingInterval,
        successUrl || `${baseUrl}/${locale}/dashboard/billing?success=true`,
        cancelUrl || `${baseUrl}/${locale}/dashboard/billing?cancelled=true`
      );

      return NextResponse.json({
        sessionId: session.id,
        url: session.url,
        mockMode: true,
      });
    }

    // Real Stripe mode
    // Get or create Stripe customer
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      customerId = await getOrCreateStripeCustomer(
        user.id,
        user.email,
        `${user.firstName} ${user.lastName}`.trim() || undefined
      );

      // Save customer ID to database
      const { prisma } = await import('@/lib/prisma');
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    // Create checkout session
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Map user's language to Stripe locale for multilingual checkout
    const stripeLocale = mapToStripeLocale(user.language || 'en');

    const session = await createCheckoutSession(
      customerId,
      priceId,
      user.id,
      successUrl || `${baseUrl}/${locale}/dashboard/billing?success=true`,
      cancelUrl || `${baseUrl}/${locale}/dashboard/billing?cancelled=true`,
      stripeLocale
    );

    // Log activity
    const { prisma } = await import('@/lib/prisma');
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'checkout_initiated',
        details: JSON.stringify({
          tier,
          sessionId: session.id,
        }),
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Checkout session error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

// GET /api/stripe/checkout - Get checkout session status
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      );
    }

    const { stripe, getCheckoutSessionTax } = await import('@/lib/stripe-server');
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['total_details'],
    });

    // Verify this session belongs to the user
    if (session.metadata?.userId !== user.id) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Get tax information if available
    const taxInfo = await getCheckoutSessionTax(sessionId);

    return NextResponse.json({
      status: session.payment_status,
      customerEmail: session.customer_email,
      amountTotal: session.amount_total ? session.amount_total / 100 : null,
      amountSubtotal: session.amount_subtotal ? session.amount_subtotal / 100 : null,
      currency: session.currency,
      tax: taxInfo,
    });
  } catch (error) {
    console.error('Get checkout session error:', error);
    return NextResponse.json(
      { error: 'Failed to get session status' },
      { status: 500 }
    );
  }
}