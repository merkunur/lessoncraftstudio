import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/api-error';

export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/user-control/grant-lifetime
 * Grant lifetime access to a user (sets Full Access tier with no expiration)
 *
 * Auth: Requires admin
 */
export const POST = withAdmin(async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

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

    // Update user to Full Access tier
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: 'full',
        subscriptionStatus: 'active',
      },
    });

    // Create or update subscription record to mark as lifetime
    await prisma.subscription.upsert({
      where: { userId },
      update: {
        planName: 'lifetime_full',
        status: 'active',
        billingInterval: null,
        cancelAtPeriodEnd: false,
        currentPeriodStart: new Date(),
        // Set far future date for lifetime access (100 years from now)
        currentPeriodEnd: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000),
      },
      create: {
        userId,
        planName: 'lifetime_full',
        status: 'active',
        billingInterval: null,
        cancelAtPeriodEnd: false,
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000),
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'lifetime_access_granted',
        details: `Lifetime Full Access granted by ${user.email}`,
        metadata: {
          previousTier: targetUser.subscriptionTier,
          grantedBy: user.email,
          grantedById: user.id,
        },
      },
    });

    // Create notification for user
    await prisma.notification.create({
      data: {
        userId,
        type: 'subscription_updated',
        title: 'Lifetime Access Granted',
        message: 'Congratulations! You now have lifetime Full Access to all features.',
        priority: 'high',
      },
    });

    return NextResponse.json({
      success: true,
      message: `Lifetime Full Access granted to ${targetUser.email}`,
      user: {
        id: targetUser.id,
        email: targetUser.email,
        newTier: 'full',
        accessType: 'lifetime',
      },
    });

  } catch (error) {
    return handleApiError(error);
  }
});
