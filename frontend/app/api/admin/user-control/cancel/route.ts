import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe-server';
import { cancelSubscriptionSchema } from '@/lib/validations/subscription';
import { handleApiError } from '@/lib/api-error';

export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/user-control/cancel
 * Cancel a user's subscription
 *
 * Auth: Requires admin
 */
export const POST = withAdmin(async (request: NextRequest, user) => {
  try {
    const body = await request.json();

    // Validate input
    const validated = cancelSubscriptionSchema.parse(body);
    const { userId, reason } = validated;

    // Get user with subscription details
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        subscriptionTier: true,
        stripeCustomerId: true,
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user has an active subscription
    if (!targetUser.stripeCustomerId) {
      return NextResponse.json(
        { error: 'User has no Stripe subscription' },
        { status: 400 }
      );
    }

    // Find active subscription
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: { in: ['active', 'past_due'] },
      },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      );
    }

    // Cancel subscription in Stripe (at period end to be fair)
    if (subscription.stripeSubscriptionId) {
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: true,
      });
    }

    // Update subscription in database
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        cancelAtPeriodEnd: true,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'subscription_cancelled_by_admin',
        details: `Subscription cancelled by ${user.email}: ${reason || 'Admin cancellation'}`,
        metadata: {
          subscriptionId: subscription.id,
          stripeSubscriptionId: subscription.stripeSubscriptionId,
          cancelledBy: user.email,
          cancelledById: user.id,
          reason: reason || 'Admin cancellation',
        },
      },
    });

    // Create notification for user
    await prisma.notification.create({
      data: {
        userId,
        type: 'subscription_cancelled',
        title: 'Subscription Cancelled',
        message: `Your subscription has been cancelled by an administrator. You will have access until ${subscription.currentPeriodEnd?.toLocaleDateString() || 'the end of your billing period'}.`,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Subscription for ${targetUser.email} will be cancelled at period end`,
      subscription: {
        id: subscription.id,
        currentPeriodEnd: subscription.currentPeriodEnd,
        cancelAtPeriodEnd: true,
      },
    });

  } catch (error) {
    return handleApiError(error);
  }
});
