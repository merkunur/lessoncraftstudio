import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET /api/admin/subscriptions/stats - Get subscription statistics
export const GET = withAdminAuth(async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const range = searchParams.get('range') || '30d';

    // Calculate date range
    let startDate = new Date();
    switch (range) {
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      case '365d':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(startDate.getDate() - 30);
    }

    // Get subscription counts by status
    const [activeCount, trialingCount, cancelledCount, pausedCount] = await Promise.all([
      prisma.subscription.count({
        where: {
          status: 'active',
          cancelAtPeriodEnd: false,
        },
      }),
      prisma.subscription.count({
        where: { status: 'trialing' },
      }),
      prisma.subscription.count({
        where: {
          OR: [
            { status: 'canceled' },
            { cancelAtPeriodEnd: true },
          ],
        },
      }),
      prisma.subscription.count({
        where: { status: 'paused' },
      }),
    ]);

    // Get subscriptions by plan
    const corePriceId = process.env.STRIPE_PRICE_CORE_MONTHLY;
    const fullPriceId = process.env.STRIPE_PRICE_FULL_MONTHLY;

    const [coreCount, fullCount] = await Promise.all([
      prisma.subscription.count({
        where: {
          stripePriceId: corePriceId,
          status: 'active',
        },
      }),
      prisma.subscription.count({
        where: {
          stripePriceId: fullPriceId,
          status: 'active',
        },
      }),
    ]);

    // Calculate MRR (Monthly Recurring Revenue)
    const coreMRR = coreCount * 999; // $9.99 in cents
    const fullMRR = fullCount * 1999; // $19.99 in cents
    const totalMRR = coreMRR + fullMRR;
    const totalARR = totalMRR * 12;

    // Calculate average revenue per user
    const totalActiveUsers = coreCount + fullCount;
    const averageRevenue = totalActiveUsers > 0 ? totalMRR / totalActiveUsers : 0;

    // Get recent subscription changes
    const [newSubscriptions, cancellations] = await Promise.all([
      prisma.subscription.count({
        where: {
          createdAt: {
            gte: startDate,
          },
        },
      }),
      prisma.subscription.count({
        where: {
          updatedAt: {
            gte: startDate,
          },
          OR: [
            { status: 'canceled' },
            { cancelAtPeriodEnd: true },
          ],
        },
      }),
    ]);

    // Get upgrades and downgrades (simplified - in production, track these events separately)
    const subscriptionChanges = await prisma.activityLog.groupBy({
      by: ['action'],
      where: {
        action: {
          in: ['subscription_upgraded', 'subscription_downgraded'],
        },
        createdAt: {
          gte: startDate,
        },
      },
      _count: {
        action: true,
      },
    });

    const upgrades = subscriptionChanges.find(c => c.action === 'subscription_upgraded')?._count.action || 0;
    const downgrades = subscriptionChanges.find(c => c.action === 'subscription_downgraded')?._count.action || 0;

    // Calculate churn rate
    const previousMonthActive = await prisma.subscription.count({
      where: {
        status: 'active',
        createdAt: {
          lt: startDate,
        },
      },
    });

    const churnRate = previousMonthActive > 0
      ? ((cancellations / previousMonthActive) * 100)
      : 0;

    // Calculate growth rate
    const previousMonthMRR = await calculatePreviousMonthMRR(startDate);
    const growthRate = previousMonthMRR > 0
      ? (((totalMRR - previousMonthMRR) / previousMonthMRR) * 100)
      : 0;

    return NextResponse.json({
      overview: {
        totalActive: activeCount,
        totalTrialing: trialingCount,
        totalCancelled: cancelledCount,
        totalPaused: pausedCount,
        mrr: totalMRR,
        arr: totalARR,
        averageRevenue,
        churnRate: Math.round(churnRate * 10) / 10,
        growthRate: Math.round(growthRate * 10) / 10,
      },
      byPlan: {
        core: {
          count: coreCount,
          mrr: coreMRR,
        },
        full: {
          count: fullCount,
          mrr: fullMRR,
        },
      },
      recent: {
        newSubscriptions,
        cancellations,
        upgrades,
        downgrades,
      },
    });
  } catch (error) {
    console.error('Get subscription stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription statistics' },
      { status: 500 }
    );
  }
});

async function calculatePreviousMonthMRR(currentStartDate: Date): Promise<number> {
  const previousMonthStart = new Date(currentStartDate);
  previousMonthStart.setMonth(previousMonthStart.getMonth() - 1);

  const corePriceId = process.env.STRIPE_PRICE_CORE_MONTHLY;
  const fullPriceId = process.env.STRIPE_PRICE_FULL_MONTHLY;

  const [coreCount, fullCount] = await Promise.all([
    prisma.subscription.count({
      where: {
        stripePriceId: corePriceId,
        status: 'active',
        createdAt: {
          lt: currentStartDate,
          gte: previousMonthStart,
        },
      },
    }),
    prisma.subscription.count({
      where: {
        stripePriceId: fullPriceId,
        status: 'active',
        createdAt: {
          lt: currentStartDate,
          gte: previousMonthStart,
        },
      },
    }),
  ]);

  return (coreCount * 999) + (fullCount * 1999);
}