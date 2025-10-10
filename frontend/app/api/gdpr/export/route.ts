import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET /api/gdpr/export
 *
 * GDPR Article 15: Right to Access
 * Export all user data in machine-readable format
 */
export async function GET(req: NextRequest) {
  try {
    // Verify authenticated user
    const currentUser = await getAuthUser(req);
    if (!currentUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch all user data
    const [
      userData,
      subscriptions,
      payments,
      sessions,
      activityLogs,
      generations,
    ] = await Promise.all([
      // Personal information
      prisma.user.findUnique({
        where: { id: currentUser.id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          subscriptionTier: true,
          isAdmin: true,
          emailVerified: true,
          createdAt: true,
          updatedAt: true,
          stripeCustomerId: true,
          gracePeriodEndsAt: true,
          accountSuspendedAt: true,
        },
      }),

      // Subscription history
      prisma.subscription.findMany({
        where: { userId: currentUser.id },
        select: {
          id: true,
          status: true,
          billingInterval: true,
          stripeSubscriptionId: true,
          createdAt: true,
          updatedAt: true,
          canceledAt: true,
          cancelReason: true,
          pastDueAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),

      // Payment history
      prisma.payment.findMany({
        where: { userId: currentUser.id },
        select: {
          id: true,
          amount: true,
          currency: true,
          status: true,
          stripeInvoiceId: true,
          refundedAmount: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),

      // Active sessions
      prisma.session.findMany({
        where: { userId: currentUser.id },
        select: {
          id: true,
          deviceId: true,
          deviceName: true,
          lastActivityAt: true,
          ipAddress: true,
          userAgent: true,
          createdAt: true,
        },
        orderBy: { lastActivityAt: 'desc' },
      }),

      // Activity logs (if available)
      prisma.activityLog
        .findMany({
          where: { userId: currentUser.id },
          select: {
            id: true,
            action: true,
            details: true,
            metadata: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 1000, // Last 1000 activities
        })
        .catch(() => null), // Table might not exist yet

      // Generated content/worksheets (if applicable)
      (prisma as any).generation
        ? (prisma as any).generation.findMany({
            where: { userId: currentUser.id },
            select: {
              id: true,
              type: true,
              createdAt: true,
              // Don't include actual content/images for size reasons
            },
            orderBy: { createdAt: 'desc' },
            take: 1000, // Last 1000 generations
          })
        : Promise.resolve(null), // Model doesn't exist yet
    ]);

    // Compile export data
    const exportData = {
      exportDate: new Date().toISOString(),
      dataSubject: {
        userId: currentUser.id,
        email: userData?.email,
        name: `${userData?.firstName} ${userData?.lastName}`,
      },
      personalInformation: userData,
      subscriptionHistory: {
        total: subscriptions.length,
        subscriptions,
      },
      paymentHistory: {
        total: payments.length,
        totalAmount: payments
          .filter(p => p.status === 'succeeded')
          .reduce((sum, p) => sum + p.amount, 0),
        totalRefunded: payments.reduce((sum, p) => sum + p.refundedAmount, 0),
        payments,
      },
      sessions: {
        total: sessions.length,
        active: sessions.filter(s => {
          const daysSinceActive = (Date.now() - s.lastActivityAt.getTime()) / (1000 * 60 * 60 * 24);
          return daysSinceActive < 7;
        }).length,
        sessions,
      },
      activityLog: activityLogs
        ? {
            total: activityLogs.length,
            logs: activityLogs,
          }
        : null,
      generatedContent: generations
        ? {
            total: generations.length,
            generations,
          }
        : null,
      gdprCompliance: {
        rightToAccess: 'Fulfilled',
        dataController: 'LessonCraft Studio',
        dataProcessors: ['Stripe', 'SendGrid/AWS SES'],
        retentionPeriod: {
          personalData: 'Until account deletion',
          paymentRecords: '7 years (legal requirement)',
          activityLogs: '90 days',
        },
      },
    };

    // Log export request
    try {
      await prisma.activityLog.create({
        data: {
          userId: currentUser.id,
          action: 'GDPR_DATA_EXPORT',
          details: 'User exported personal data',
          ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
          userAgent: req.headers.get('user-agent'),
        },
      });
    } catch (err) {
      // Activity log table might not exist yet
      console.log('Could not log GDPR export activity:', err);
    }

    // Return as downloadable JSON
    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="gdpr-export-${currentUser.id}-${Date.now()}.json"`,
      },
    });
  } catch (error) {
    console.error('Error exporting user data:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to export user data',
      },
      { status: 500 }
    );
  }
}
