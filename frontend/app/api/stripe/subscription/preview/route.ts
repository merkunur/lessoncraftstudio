import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getCurrentUser } from '@/lib/auth';
import { stripe } from '@/lib/stripe-server';
import { SUBSCRIPTION_TIERS } from '@/lib/stripe-config';
import { prisma } from '@/lib/prisma';

// POST /api/stripe/subscription/preview - Preview subscription change with proration
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
    const previewSchema = z.object({
      tier: z.enum(['CORE', 'FULL']),
      billingInterval: z.enum(['monthly', 'yearly']).optional(),
    });

    const body = await request.json();
    const validationResult = previewSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { tier: newTier, billingInterval: newBillingInterval } = validationResult.data;

    // Get current subscription
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        status: { in: ['active', 'past_due'] },
      },
    });

    if (!subscription || !subscription.stripeSubscriptionId) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      );
    }

    // Get current Stripe subscription
    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscription.stripeSubscriptionId
    );

    // Determine current tier and billing interval
    const currentTier = subscription.planName.split('_')[0].toUpperCase();
    const currentBillingInterval = subscription.billingInterval || 'monthly';

    // Use current billing interval if not specified
    const targetBillingInterval = newBillingInterval || currentBillingInterval;

    // Check if this is actually a change
    if (currentTier === newTier && currentBillingInterval === targetBillingInterval) {
      return NextResponse.json(
        { error: 'This is your current plan' },
        { status: 400 }
      );
    }

    // Get new price ID
    const tierInfo = SUBSCRIPTION_TIERS[newTier];
    const newPriceId = targetBillingInterval === 'yearly'
      ? tierInfo.priceIdYearly
      : tierInfo.priceIdMonthly;

    if (!newPriceId) {
      return NextResponse.json(
        { error: 'Invalid subscription tier or billing interval' },
        { status: 400 }
      );
    }

    // Preview the upcoming invoice with proration
    const upcomingInvoice = await (stripe.invoices as any).retrieveUpcoming({
      customer: stripeSubscription.customer as string,
      subscription: stripeSubscription.id,
      subscription_items: [
        {
          id: stripeSubscription.items.data[0].id,
          price: newPriceId,
        },
      ],
      subscription_proration_behavior: 'create_prorations',
      subscription_proration_date: Math.floor(Date.now() / 1000),
    });

    // Calculate proration details
    const newPrice = tierInfo.priceIdMonthly === newPriceId
      ? tierInfo.priceMonthly
      : tierInfo.priceYearly / 12;

    const oldTierInfo = SUBSCRIPTION_TIERS[currentTier as keyof typeof SUBSCRIPTION_TIERS];
    const oldPrice = currentBillingInterval === 'yearly'
      ? oldTierInfo.priceYearly / 12
      : oldTierInfo.priceMonthly;

    const isUpgrade = oldPrice < newPrice;
    const proratedAmount = upcomingInvoice.amount_due / 100; // Convert from cents
    const taxAmount = (upcomingInvoice.tax || 0) / 100;
    const subtotal = (upcomingInvoice.subtotal || 0) / 100;

    // Determine change type
    let changeType: 'upgrade' | 'downgrade' | 'interval_change';
    if (currentTier === newTier && currentBillingInterval !== targetBillingInterval) {
      changeType = 'interval_change';
    } else if (currentTier === 'CORE' && newTier === 'FULL') {
      changeType = 'upgrade';
    } else if (currentTier === 'FULL' && newTier === 'CORE') {
      changeType = 'downgrade';
    } else {
      changeType = isUpgrade ? 'upgrade' : 'downgrade';
    }

    // Build response
    return NextResponse.json({
      currentPlan: {
        tier: currentTier,
        billingInterval: currentBillingInterval,
        price: oldPrice,
      },
      newPlan: {
        tier: newTier,
        billingInterval: targetBillingInterval,
        price: targetBillingInterval === 'yearly' ? tierInfo.priceYearly : tierInfo.priceMonthly,
        pricePerMonth: targetBillingInterval === 'yearly' ? tierInfo.priceYearly / 12 : tierInfo.priceMonthly,
      },
      proration: {
        changeType,
        immediateCharge: proratedAmount,
        tax: taxAmount,
        subtotal,
        currency: upcomingInvoice.currency,
        nextBillingDate: new Date((stripeSubscription as any).current_period_end * 1000),
        prorationDate: new Date(),
      },
      description: getChangeDescription(changeType, currentTier, newTier, currentBillingInterval, targetBillingInterval),
    });
  } catch (error) {
    console.error('Preview subscription change error:', error);
    return NextResponse.json(
      { error: 'Failed to preview subscription change' },
      { status: 500 }
    );
  }
}

function getChangeDescription(
  changeType: 'upgrade' | 'downgrade' | 'interval_change',
  currentTier: string,
  newTier: string,
  currentInterval: string,
  newInterval: string
): string {
  if (changeType === 'interval_change') {
    if (newInterval === 'yearly') {
      return `You'll switch to annual billing and save 20%. Your card will be charged the prorated amount now, and then annually on your renewal date.`;
    } else {
      return `You'll switch to monthly billing. Your card will be charged the prorated amount now, and then monthly on your renewal date.`;
    }
  } else if (changeType === 'upgrade') {
    return `You'll immediately get access to ${newTier} features. Your card will be charged the prorated amount for the remainder of your billing period.`;
  } else {
    return `You'll be downgraded to ${newTier} at the end of your current billing period. No immediate charge will be made.`;
  }
}
