import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { calculateMRR, calculateARR, calculateARPU } from '@/lib/analytics/revenue';
import { calculateChurnRate, calculateRetentionRate } from '@/lib/analytics/churn';
import { getPaymentAnalytics } from '@/lib/analytics/payments';
import { calculateLTV } from '@/lib/analytics/ltv';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/billing/overview
 *
 * Returns comprehensive billing dashboard overview with all key metrics
 */
export const GET = withAdmin(async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || '30'; // Default 30 days

    const days = parseInt(period);
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Calculate all metrics in parallel
    const [
      mrrData,
      arr,
      arpu,
      ltvData,
      churnData,
      retentionRate,
      paymentAnalytics,
      activeSubscriptions,
      newSubscriptions,
      totalRevenue,
    ] = await Promise.all([
      calculateMRR(),
      calculateARR(),
      calculateARPU(),
      calculateLTV(),
      calculateChurnRate(startDate, endDate),
      calculateRetentionRate(startDate, endDate),
      getPaymentAnalytics(startDate, endDate),

      // Active subscriptions count
      prisma.subscription.count({
        where: {
          status: { in: ['active', 'past_due'] },
        },
      }),

      // New subscriptions in period
      prisma.subscription.count({
        where: {
          createdAt: { gte: startDate, lte: endDate },
        },
      }),

      // Total revenue in period
      prisma.payment.aggregate({
        where: {
          status: 'succeeded',
          createdAt: { gte: startDate, lte: endDate },
        },
        _sum: {
          amount: true,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        period: {
          days,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        revenue: {
          mrr: mrrData.total,
          mrrGrowth: mrrData.growth,
          mrrByTier: mrrData.byTier,
          arr,
          arpu,
          totalRevenue: totalRevenue._sum.amount || 0,
        },
        subscriptions: {
          active: activeSubscriptions,
          new: newSubscriptions,
          churnRate: churnData.rate,
          retentionRate,
          voluntaryChurn: churnData.voluntary,
          involuntaryChurn: churnData.involuntary,
        },
        payments: {
          totalRevenue: paymentAnalytics.totalRevenue,
          successful: paymentAnalytics.successfulPayments,
          failed: paymentAnalytics.failedPayments,
          successRate: paymentAnalytics.successRate,
          refundedAmount: paymentAnalytics.refundedAmount,
          refundRate: paymentAnalytics.refundRate,
          averageTransactionValue: paymentAnalytics.averageTransactionValue,
        },
        ltv: {
          average: ltvData.averageLTV,
          byTier: ltvData.byTier,
          averageLifetimeMonths: ltvData.averageLifetimeMonths,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching billing overview:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch billing overview',
      },
      { status: 500 }
    );
  }
});
