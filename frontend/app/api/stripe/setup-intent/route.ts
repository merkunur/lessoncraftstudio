import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { stripe } from '@/lib/stripe-server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// POST /api/stripe/setup-intent - Create a SetupIntent for adding payment methods
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Ensure user has a Stripe customer ID
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const { getOrCreateStripeCustomer } = await import('@/lib/stripe-server');
      customerId = await getOrCreateStripeCustomer(
        user.id,
        user.email,
        `${user.firstName} ${user.lastName}`.trim() || undefined
      );

      // Save customer ID to database
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    // Create a SetupIntent
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ['card'],
      metadata: {
        userId: user.id,
      },
    });

    return NextResponse.json({
      clientSecret: setupIntent.client_secret,
      setupIntentId: setupIntent.id,
    });
  } catch (error) {
    console.error('Create setup intent error:', error);
    return NextResponse.json(
      { error: 'Failed to create setup intent' },
      { status: 500 }
    );
  }
}

// GET /api/stripe/setup-intent - Retrieve a SetupIntent status
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const setupIntentId = searchParams.get('id');

    if (!setupIntentId) {
      return NextResponse.json(
        { error: 'Setup intent ID is required' },
        { status: 400 }
      );
    }

    const setupIntent = await stripe.setupIntents.retrieve(setupIntentId);

    // Verify this setup intent belongs to the user
    if (setupIntent.metadata?.userId !== user.id) {
      return NextResponse.json(
        { error: 'Setup intent not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: setupIntent.status,
      paymentMethod: setupIntent.payment_method,
      lastSetupError: setupIntent.last_setup_error,
    });
  } catch (error) {
    console.error('Get setup intent error:', error);
    return NextResponse.json(
      { error: 'Failed to get setup intent' },
      { status: 500 }
    );
  }
}
