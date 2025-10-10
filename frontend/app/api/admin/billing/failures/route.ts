import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { getPaymentFailureBreakdown, getDunningRecoveryStats } from '@/lib/analytics/payments';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/billing/failures
 *
 * Returns payment failure analytics and dunning recovery statistics
 */
export const GET = withAdmin(async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || '30';

    const days = parseInt(period);
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get all metrics in parallel
    const [
      failureBreakdown,
      recoveryStats,
      recentFailures,
      failuresByStatus,
      averageRecoveryTime,
    ] = await Promise.all([
      getPaymentFailureBreakdown(startDate, endDate),
      getDunningRecoveryStats(startDate, endDate),

      // Recent failures (last 20)
      prisma.paymentFailure.findMany({
        take: 20,
        orderBy: { createdAt: 'desc' },
        where: {
          createdAt: { gte: startDate, lte: endDate },
        },
        include: {
          user: {
            select: {
              email: true,
              firstName: true,
              lastName: true,
              subscriptionTier: true,
            },
          },
        },
      }),

      // Failures by status
      prisma.paymentFailure.groupBy({
        by: ['status'],
        _count: true,
        where: {
          createdAt: { gte: startDate, lte: endDate },
        },
      }),

      // Average recovery time
      prisma.paymentFailure.findMany({
        where: {
          status: 'recovered',
          recoveredAt: { not: null },
          createdAt: { gte: startDate, lte: endDate },
        },
        select: {
          createdAt: true,
          recoveredAt: true,
        },
      }),
    ]);

    // Calculate average recovery time in hours
    let totalRecoveryTime = 0;
    for (const failure of averageRecoveryTime) {
      if (failure.recoveredAt) {
        const recoveryTime = failure.recoveredAt.getTime() - failure.createdAt.getTime();
        totalRecoveryTime += recoveryTime;
      }
    }

    const avgRecoveryHours = averageRecoveryTime.length > 0
      ? totalRecoveryTime / averageRecoveryTime.length / (1000 * 60 * 60)
      : 0;

    // Calculate at-risk revenue (pending failures)
    const atRiskRevenue = await prisma.paymentFailure.aggregate({
      where: {
        status: { in: ['pending', 'retrying'] },
      },
      _sum: {
        amount: true,
      },
    });

    // Get failure trend (daily for the period)
    const failureTrend = [];
    for (let i = days - 1; i >= 0; i--) {
      const dayStart = new Date(endDate);
      dayStart.setDate(dayStart.getDate() - i);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);

      const count = await prisma.paymentFailure.count({
        where: {
          createdAt: { gte: dayStart, lte: dayEnd },
        },
      });

      failureTrend.push({
        date: dayStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        count,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        period: {
          days,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        overview: {
          total: recoveryStats.totalFailures,
          recovered: recoveryStats.recovered,
          pending: recoveryStats.pending,
          recoveryRate: recoveryStats.recoveryRate,
          averageRecoveryHours: Math.round(avgRecoveryHours * 10) / 10,
          atRiskRevenue: atRiskRevenue._sum.amount || 0,
        },
        byReason: failureBreakdown,
        byStatus: Object.fromEntries(
          failuresByStatus.map(f => [f.status, f._count])
        ),
        trend: failureTrend,
        recent: recentFailures.map(f => ({
          id: f.id,
          amount: f.amount,
          currency: f.currency,
          failureCode: f.failureCode,
          failureMessage: f.failureMessage,
          status: f.status,
          retryCount: f.retryCount,
          nextRetryAt: f.nextRetryAt?.toISOString(),
          createdAt: f.createdAt.toISOString(),
          user: {
            email: f.user.email,
            name: `${f.user.firstName} ${f.user.lastName}`,
            tier: f.user.subscriptionTier,
          },
        })),
      },
    });
  } catch (error) {
    console.error('Error fetching payment failure analytics:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch payment failure analytics',
      },
      { status: 500 }
    );
  }
});
