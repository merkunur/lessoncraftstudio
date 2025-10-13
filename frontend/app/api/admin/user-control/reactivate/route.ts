import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/api-error';

export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/user-control/reactivate
 * Reactivate a suspended user account
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

    // Get user details
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        isSuspended: true,
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!targetUser.isSuspended) {
      return NextResponse.json(
        { error: 'User account is not suspended' },
        { status: 400 }
      );
    }

    // Reactivate the user
    await prisma.user.update({
      where: { id: userId },
      data: {
        isSuspended: false,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: targetUser.id,
        action: 'account_reactivated',
        details: `Account reactivated by admin ${user.email}`,
        metadata: {
          reactivatedBy: user.email,
          reactivatedById: user.id,
        },
      },
    });

    // Create notification for user
    await prisma.notification.create({
      data: {
        userId: targetUser.id,
        type: 'account_reactivated',
        title: 'Account Reactivated',
        message: 'Your account has been reactivated. You can now access all features.',
        priority: 'high',
      },
    });

    return NextResponse.json({
      success: true,
      message: `Account reactivated successfully for ${targetUser.email}`,
    });

  } catch (error: any) {
    return handleApiError(error);
  }
});
