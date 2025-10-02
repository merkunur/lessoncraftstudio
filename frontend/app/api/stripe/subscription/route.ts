import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { 
  getSubscriptionStatus, 
  cancelSubscription, 
  reactivateSubscription,
  updateSubscription 
} from '@/lib/stripe-server';
import { SUBSCRIPTION_TIERS } from '@/lib/stripe-config';
import { prisma } from '@/lib/prisma';

// GET /api/stripe/subscription - Get current subscription status
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get subscription from database
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        status: { in: ['active', 'past_due'] },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!subscription) {
      return NextResponse.json({
        status: 'inactive',
        tier: 'FREE',
        message: 'No active subscription',
      });
    }

    // Get latest status from Stripe
    if (subscription.stripeSubscriptionId) {
      try {
        const stripeStatus = await getSubscriptionStatus(subscription.stripeSubscriptionId);
        
        // Update local database if status changed
        if (stripeStatus.status !== subscription.status) {
          await prisma.subscription.update({
            where: { id: subscription.id },
            data: {
              status: stripeStatus.status as any,
              cancelAtPeriodEnd: stripeStatus.cancelAtPeriodEnd,
            },
          });
        }

        // Convert planName to tier format (free/core_monthly/full_yearly -> FREE/CORE/FULL)
        const tierFromPlan = subscription.planName.split('_')[0].toUpperCase();

        return NextResponse.json({
          id: subscription.id,
          tier: stripeStatus.tier || tierFromPlan,
          status: stripeStatus.status,
          currentPeriodEnd: stripeStatus.currentPeriodEnd,
          cancelAtPeriodEnd: stripeStatus.cancelAtPeriodEnd,
          // trialEnd removed - no trials offered
        });
      } catch (stripeError) {
        console.error('Error fetching from Stripe:', stripeError);
        // Fall back to database data
      }
    }

    // Return database data if Stripe call fails
    // Convert planName to tier format (free/core_monthly/full_yearly -> FREE/CORE/FULL)
    const tierFromPlan = subscription.planName.split('_')[0].toUpperCase();

    return NextResponse.json({
      id: subscription.id,
      tier: tierFromPlan,
      status: subscription.status,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      // trialEnd removed - no trials offered
    });
  } catch (error) {
    console.error('Get subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to get subscription' },
      { status: 500 }
    );
  }
}

// DELETE /api/stripe/subscription - Cancel subscription
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

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

    // Cancel subscription at period end
    const cancelledSubscription = await cancelSubscription(subscription.stripeSubscriptionId);

    // Update database
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        cancelAtPeriodEnd: true,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'subscription_cancel_requested',
        details: {
          subscriptionId: subscription.id,
          cancelAtPeriodEnd: cancelledSubscription.current_period_end,
        },
      },
    });

    return NextResponse.json({
      message: 'Subscription will be cancelled at the end of the billing period',
      cancelAt: new Date(cancelledSubscription.current_period_end * 1000),
    });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}

// PATCH /api/stripe/subscription - Reactivate or update subscription
export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const action = body.action; // 'reactivate' or 'upgrade' or 'downgrade'

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

    if (action === 'reactivate') {
      // Reactivate a cancelled subscription
      if (!subscription.cancelAtPeriodEnd) {
        return NextResponse.json(
          { error: 'Subscription is not scheduled for cancellation' },
          { status: 400 }
        );
      }

      await reactivateSubscription(subscription.stripeSubscriptionId);

      // Update database
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          cancelAtPeriodEnd: false,
        },
      });

      // Log activity
      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action: 'subscription_reactivated',
          details: {
            subscriptionId: subscription.id,
          },
        },
      });

      return NextResponse.json({
        message: 'Subscription reactivated successfully',
      });
    } else if (action === 'upgrade' || action === 'downgrade') {
      // Change subscription tier
      const newTier = body.tier as 'CORE' | 'FULL';
      if (!newTier) {
        return NextResponse.json(
          { error: 'New tier required' },
          { status: 400 }
        );
      }

      const tierInfo = SUBSCRIPTION_TIERS[newTier];
      if (!tierInfo.priceId) {
        return NextResponse.json(
          { error: 'Invalid tier' },
          { status: 400 }
        );
      }

      await updateSubscription(subscription.stripeSubscriptionId, tierInfo.priceId);

      // Determine new plan name based on tier and billing interval
      const billingInterval = subscription.billingInterval || 'monthly';
      const newPlanName = newTier.toLowerCase() + (newTier !== 'FREE' ? `_${billingInterval}` : '');

      // Update database
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          planName: newPlanName,
          stripePriceId: tierInfo.priceId,
        },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: {
          subscriptionTier: newTier.toLowerCase() as any,
        },
      });

      // Log activity
      const fromTier = subscription.planName.split('_')[0];
      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action: action === 'upgrade' ? 'subscription_upgraded' : 'subscription_downgraded',
          details: {
            subscriptionId: subscription.id,
            fromTier: fromTier,
            toTier: newTier.toLowerCase(),
          },
        },
      });

      return NextResponse.json({
        message: `Subscription ${action}d successfully`,
        newTier,
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Update subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to update subscription' },
      { status: 500 }
    );
  }
}