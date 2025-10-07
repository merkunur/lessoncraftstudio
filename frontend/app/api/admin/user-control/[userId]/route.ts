import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/api-error';

/**
 * GET /api/admin/user-control/[userId]
 * Get complete user profile with subscription, payments, activity, and usage details
 *
 * Auth: Requires admin
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    // Fetch complete user profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscription: {
          select: {
            id: true,
            planName: true,
            status: true,
            billingInterval: true,
            currentPeriodStart: true,
            currentPeriodEnd: true,
            cancelAtPeriodEnd: true,
            canceledAt: true,
            stripeSubscriptionId: true,
            stripePriceId: true,
            createdAt: true,
          },
        },
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 50, // Last 50 payments
          select: {
            id: true,
            amount: true,
            currency: true,
            status: true,
            description: true,
            stripePaymentIntentId: true,
            refundedAmount: true,
            createdAt: true,
          },
        },
        activityLogs: {
          orderBy: { createdAt: 'desc' },
          take: 100, // Last 100 activity logs
          select: {
            id: true,
            action: true,
            details: true,
            metadata: true,
            createdAt: true,
          },
        },
        sessions: {
          where: {
            expiresAt: {
              gt: new Date(),
            },
          },
          orderBy: { lastActivityAt: 'desc' },
          select: {
            id: true,
            deviceId: true,
            deviceName: true,
            deviceType: true,
            ipAddress: true,
            country: true,
            city: true,
            lastActivityAt: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Calculate usage statistics
    const usageStats = {
      totalPayments: user.payments.length,
      totalRevenue: user.payments
        .filter(p => p.status === 'succeeded')
        .reduce((sum, p) => sum + p.amount, 0),
      activeSessions: user.sessions.length,
      accountAge: Math.floor(
        (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      ),
    };

    // Calculate subscription metrics
    let subscriptionMetrics = null;
    if (user.subscription) {
      const daysSinceStart = Math.floor(
        (Date.now() - new Date(user.subscription.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      );
      const daysUntilRenewal = user.subscription.currentPeriodEnd
        ? Math.floor(
            (new Date(user.subscription.currentPeriodEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
          )
        : null;

      subscriptionMetrics = {
        daysSinceStart,
        daysUntilRenewal,
        isLifetime: user.subscription.planName.includes('lifetime'),
        willCancel: user.subscription.cancelAtPeriodEnd,
      };
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        subscriptionTier: user.subscriptionTier,
        stripeCustomerId: user.stripeCustomerId,
        isSuspended: user.isSuspended,
        suspendedAt: user.suspendedAt,
        suspensionReason: user.suspensionReason,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      subscription: user.subscription,
      subscriptionMetrics,
      payments: user.payments,
      activityLogs: user.activityLogs,
      sessions: user.sessions,
      usageStats,
    });

  } catch (error) {
    return handleApiError(error);
  }
}
