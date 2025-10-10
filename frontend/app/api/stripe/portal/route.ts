import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { createPortalSession } from '@/lib/stripe-server';
import { mapToStripeLocale } from '@/lib/locale-utils';

// POST /api/stripe/portal - Create a billing portal session
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

    // Check if user has a Stripe customer ID
    if (!user.stripeCustomerId) {
      return NextResponse.json(
        { 
          error: 'No billing account found',
          message: 'You need to subscribe to a plan first'
        },
        { status: 400 }
      );
    }

    // Get return URL from request or use default
    const body = await request.json().catch(() => ({}));
    const returnUrl = body.returnUrl ||
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/billing`;

    // Map user's language to Stripe locale for multilingual billing portal
    const stripeLocale = mapToStripeLocale(user.language || 'en');

    // Create portal session
    const session = await createPortalSession(
      user.stripeCustomerId,
      returnUrl,
      stripeLocale
    );

    // Log activity
    const { prisma } = await import('@/lib/prisma');
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'billing_portal_accessed',
        details: 'User accessed billing portal',
        metadata: {
          sessionId: session.id,
        },
      },
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error('Portal session error:', error);
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    );
  }
}