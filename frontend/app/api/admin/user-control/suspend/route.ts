import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/api-error';

export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/user-control/suspend
 * Suspend a user account (revokes access without deleting data)
 *
 * Auth: Requires admin
 */
export const POST = withAdmin(async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const { userId, reason } = body;

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
        isSuspended: true,
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if already suspended
    if (targetUser.isSuspended) {
      return NextResponse.json(
        { error: 'User is already suspended' },
        { status: 400 }
      );
    }

    // Suspend the user
    await prisma.user.update({
      where: { id: userId },
      data: {
        isSuspended: true,
        suspendedAt: new Date(),
      },
    });

    // Revoke all active sessions
    await prisma.session.deleteMany({
      where: { userId },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'account_suspended',
        details: reason || 'Suspended by admin',
        metadata: {
          suspendedBy: user.email,
          suspendedById: user.id,
          reason,
        },
      },
    });

    // Create notification for user
    await prisma.notification.create({
      data: {
        userId,
        type: 'account_suspended',
        title: 'Account Suspended',
        message: reason || 'Your account has been suspended. Please contact support for more information.',
        priority: 'critical',
      },
    });

    return NextResponse.json({
      success: true,
      message: `Account ${targetUser.email} has been suspended`,
      user: {
        id: targetUser.id,
        email: targetUser.email,
        suspended: true,
      },
    });

  } catch (error) {
    return handleApiError(error);
  }
});
