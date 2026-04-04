import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/api-error';

export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/user-control/grant-access
 * Manually grant app access to a user by creating a Purchase record.
 *
 * Body: { userId: string, appIds: string[], reason?: string }
 * Auth: Requires admin
 */
export const POST = withAdmin(async (request: NextRequest, adminUser) => {
  try {
    const body = await request.json();
    const { userId, appIds, reason } = body;

    if (!userId || !appIds || !Array.isArray(appIds) || appIds.length === 0) {
      return NextResponse.json(
        { error: 'userId and appIds (non-empty array) are required' },
        { status: 400 }
      );
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create a manual purchase record
    const purchase = await prisma.purchase.create({
      data: {
        lsOrderId: `admin_grant_${Date.now()}`,
        lsProductId: 'admin_manual',
        buyerEmail: targetUser.email,
        userId: targetUser.id,
        appsAccess: appIds,
        amount: 0,
        currency: 'USD',
        status: 'active',
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'access_granted_by_admin',
        details: `Admin ${adminUser.email} granted access to ${appIds.length} apps: ${appIds.join(', ')}${reason ? `. Reason: ${reason}` : ''}`,
        metadata: {
          appIds,
          reason: reason || null,
          grantedBy: adminUser.email,
          purchaseId: purchase.id,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: `Granted access to ${appIds.length} apps for ${targetUser.email}`,
      purchase: {
        id: purchase.id,
        appsAccess: purchase.appsAccess,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
});
