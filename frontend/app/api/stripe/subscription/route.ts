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
      // No Stripe subscription, but user might have a manual subscription tier
      // Fallback to user's subscriptionTier field
      const manualTier = (user.subscriptionTier || 'free').toUpperCase();

      // Return 'manual' status for non-free tiers, 'inactive' for free
      return NextResponse.json({
        status: manualTier !== 'FREE' ? 'manual' : 'inactive',
        tier: manualTier,
        message: manualTier !== 'FREE' ? 'Manual subscription (no billing)' : 'No active subscription',
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
        details: `Subscription cancellation requested, ends at ${new Date((cancelledSubscription as any).current_period_end * 1000).toISOString()}`,
        metadata: {
          subscriptionId: subscription.id,
          cancelAtPeriodEnd: (cancelledSubscription as any).current_period_end,
        },
      },
    });

    return NextResponse.json({
      message: 'Subscription will be cancelled at the end of the billing period',
      cancelAt: new Date((cancelledSubscription as any).current_period_end * 1000),
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
    const action = body.action; // 'reactivate' or 'change_plan'

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
          details: `Subscription reactivated: ${subscription.planName}`,
          metadata: {
            subscriptionId: subscription.id,
          },
        },
      });

      return NextResponse.json({
        message: 'Subscription reactivated successfully',
      });
    } else if (action === 'change_plan') {
      // Change subscription tier and/or billing interval
      const newTier = body.tier as 'CORE' | 'FULL';
      const newBillingInterval = body.billingInterval as 'monthly' | 'yearly' | undefined;

      if (!newTier) {
        return NextResponse.json(
          { error: 'New tier required' },
          { status: 400 }
        );
      }

      // Determine current tier and billing interval
      const currentTier = subscription.planName.split('_')[0].toUpperCase();
      const currentBillingInterval = subscription.billingInterval || 'monthly';
      const targetBillingInterval = newBillingInterval || currentBillingInterval;

      // Check if this is actually a change
      if (currentTier === newTier && currentBillingInterval === targetBillingInterval) {
        return NextResponse.json(
          { error: 'This is your current plan' },
          { status: 400 }
        );
      }

      // Get new price ID based on tier and billing interval
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

      // Determine if this is an upgrade or downgrade
      const isUpgrade = (currentTier === 'CORE' && newTier === 'FULL') ||
        (currentTier === newTier && currentBillingInterval === 'monthly' && targetBillingInterval === 'yearly');

      // Update subscription with proration
      await updateSubscription(subscription.stripeSubscriptionId, newPriceId);

      // Update plan name
      const newPlanName = `${newTier.toLowerCase()}_${targetBillingInterval}`;

      // Update database
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: {
          planName: newPlanName,
          stripePriceId: newPriceId,
          billingInterval: targetBillingInterval,
        },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: {
          subscriptionTier: newTier.toLowerCase() as any,
        },
      });

      // Determine change type for logging
      let changeType: string;
      if (currentTier === newTier && currentBillingInterval !== targetBillingInterval) {
        changeType = `billing_interval_changed_to_${targetBillingInterval}`;
      } else {
        changeType = isUpgrade ? 'subscription_upgraded' : 'subscription_downgraded';
      }

      // Log activity
      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action: changeType,
          details: `Subscription changed from ${subscription.planName} to ${newPlanName}`,
          metadata: {
            subscriptionId: subscription.id,
            fromTier: currentTier.toLowerCase(),
            toTier: newTier.toLowerCase(),
            fromInterval: currentBillingInterval,
            toInterval: targetBillingInterval,
          },
        },
      });

      // Send upgrade/downgrade email notification
      const { sendSubscriptionUpgradeEmail } = await import('@/lib/email');

      try {
        await sendSubscriptionUpgradeEmail({
          email: user.email,
          firstName: user.firstName || 'there',
          language: user.language || 'en',
          oldPlan: `${currentTier} (${currentBillingInterval})`,
          newPlan: `${newTier} (${targetBillingInterval})`,
        });
      } catch (emailError) {
        console.error('Failed to send upgrade email:', emailError);
        // Don't fail the request if email fails
      }

      return NextResponse.json({
        message: 'Subscription updated successfully',
        newTier,
        newBillingInterval: targetBillingInterval,
        changeType: isUpgrade ? 'upgrade' : 'downgrade',
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