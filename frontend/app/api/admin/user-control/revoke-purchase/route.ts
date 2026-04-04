import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/api-error';

export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/user-control/revoke-purchase
 * Revoke a specific purchase (mark as refunded).
 *
 * Body: { purchaseId: string, reason?: string }
 * Auth: Requires admin
 */
export const POST = withAdmin(async (request: NextRequest, adminUser) => {
  try {
    const body = await request.json();
    const { purchaseId, reason } = body;

    if (!purchaseId) {
      return NextResponse.json(
        { error: 'purchaseId is required' },
        { status: 400 }
      );
    }

    const purchase = await prisma.purchase.findUnique({
      where: { id: purchaseId },
      select: {
        id: true,
        buyerEmail: true,
        userId: true,
        appsAccess: true,
        status: true,
        lsOrderId: true,
      },
    });

    if (!purchase) {
      return NextResponse.json({ error: 'Purchase not found' }, { status: 404 });
    }

    if (purchase.status === 'refunded') {
      return NextResponse.json({ error: 'Purchase is already refunded' }, { status: 400 });
    }

    await prisma.purchase.update({
      where: { id: purchaseId },
      data: {
        status: 'refunded',
        refundedAt: new Date(),
      },
    });

    // Log activity
    if (purchase.userId) {
      await prisma.activityLog.create({
        data: {
          userId: purchase.userId,
          action: 'purchase_revoked_by_admin',
          details: `Admin ${adminUser.email} revoked purchase ${purchase.lsOrderId} (${purchase.appsAccess.length} apps)${reason ? `. Reason: ${reason}` : ''}`,
          metadata: {
            purchaseId,
            lsOrderId: purchase.lsOrderId,
            appsAccess: purchase.appsAccess,
            reason: reason || null,
            revokedBy: adminUser.email,
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Purchase ${purchase.lsOrderId} revoked for ${purchase.buyerEmail}`,
    });
  } catch (error) {
    return handleApiError(error);
  }
});
