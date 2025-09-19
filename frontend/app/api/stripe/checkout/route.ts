import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getCurrentUser } from '@/lib/auth';
import { getOrCreateStripeCustomer, createCheckoutSession } from '@/lib/stripe-server';
import { SUBSCRIPTION_TIERS } from '@/lib/stripe-config';

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
      successUrl: z.string().url().optional(),
      cancelUrl: z.string().url().optional(),
    });

    const body = await request.json();
    const validationResult = checkoutSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { tier, successUrl, cancelUrl } = validationResult.data;

    // Get subscription tier details
    const tierInfo = SUBSCRIPTION_TIERS[tier];
    if (!tierInfo.priceId) {
      return NextResponse.json(
        { error: 'Invalid subscription tier' },
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
    const session = await createCheckoutSession(
      customerId,
      tierInfo.priceId,
      user.id,
      successUrl || `${baseUrl}/dashboard/billing?success=true`,
      cancelUrl || `${baseUrl}/dashboard/billing?cancelled=true`
    );

    // Log activity
    const { prisma } = await import('@/lib/prisma');
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'checkout_initiated',
        details: {
          tier,
          sessionId: session.id,
        },
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

    const { stripe } = await import('@/lib/stripe-server');
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verify this session belongs to the user
    if (session.metadata?.userId !== user.id) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: session.payment_status,
      customerEmail: session.customer_email,
      amountTotal: session.amount_total ? session.amount_total / 100 : null,
      currency: session.currency,
    });
  } catch (error) {
    console.error('Get checkout session error:', error);
    return NextResponse.json(
      { error: 'Failed to get session status' },
      { status: 500 }
    );
  }
}