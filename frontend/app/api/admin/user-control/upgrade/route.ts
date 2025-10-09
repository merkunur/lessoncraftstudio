import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';
import { upgradeUserSchema } from '@/lib/validations/subscription';
import { handleApiError } from '@/lib/api-error';

/**
 * POST /api/admin/user-control/upgrade
 * Upgrade a user's subscription tier
 *
 * Auth: Requires admin
 */
export const POST = withAdmin(async (request: NextRequest, user) => {
  try {
    const body = await request.json();

    // Validate input
    const validated = upgradeUserSchema.parse(body);
    const { userId, tier } = validated;

    // Check if user exists
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        subscriptionTier: true,
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if already at this tier
    if (targetUser.subscriptionTier === tier) {
      return NextResponse.json(
        { error: `User is already on ${tier} tier` },
        { status: 400 }
      );
    }

    // Delete any existing subscription records (manual upgrades don't have Stripe subscriptions)
    // This ensures the billing page will fall back to user.subscriptionTier
    await prisma.subscription.deleteMany({
      where: { userId },
    });

    // Update user tier
    await prisma.user.update({
      where: { id: userId },
      data: { subscriptionTier: tier },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'tier_upgraded_by_admin',
        details: `Upgraded from ${targetUser.subscriptionTier} to ${tier} by ${user.email}`,
        metadata: {
          previousTier: targetUser.subscriptionTier,
          newTier: tier,
          upgradedBy: user.email,
          upgradedById: user.id,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: `User ${targetUser.email} upgraded from ${targetUser.subscriptionTier} to ${tier}`,
      user: {
        id: targetUser.id,
        email: targetUser.email,
        newTier: tier,
      },
    });

  } catch (error) {
    return handleApiError(error);
  }
});
