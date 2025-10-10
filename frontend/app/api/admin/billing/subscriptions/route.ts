import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/billing/subscriptions
 *
 * Returns detailed subscription analytics and breakdowns
 */
export const GET = withAdmin(async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || '30';

    const days = parseInt(period);
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get subscription counts by tier
    const activeSubscriptions = await prisma.subscription.findMany({
      where: {
        status: { in: ['active', 'past_due'] },
      },
      include: {
        user: {
          select: {
            subscriptionTier: true,
          },
        },
      },
    });

    const subscriptionsByTier = activeSubscriptions.reduce((acc, sub) => {
      const tier = sub.user.subscriptionTier;
      acc[tier] = (acc[tier] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get subscriptions by billing interval
    const subscriptionsByInterval = await prisma.subscription.groupBy({
      by: ['billingInterval'],
      _count: true,
      where: {
        status: { in: ['active', 'past_due'] },
      },
    });

    // Get subscriptions by status
    const subscriptionsByStatus = await prisma.subscription.groupBy({
      by: ['status'],
      _count: true,
    });

    // New subscriptions trend (last 12 months)
    const newSubscriptionsTrend = [];
    for (let i = 11; i >= 0; i--) {
      const monthStart = new Date();
      monthStart.setMonth(monthStart.getMonth() - i);
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);

      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      monthEnd.setDate(0);
      monthEnd.setHours(23, 59, 59, 999);

      const count = await prisma.subscription.count({
        where: {
          createdAt: { gte: monthStart, lte: monthEnd },
        },
      });

      newSubscriptionsTrend.push({
        month: monthStart.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
        count,
      });
    }

    // Canceled subscriptions in period with reasons
    const canceledSubscriptions = await prisma.subscription.groupBy({
      by: ['cancelReason'],
      _count: true,
      where: {
        canceledAt: { gte: startDate, lte: endDate },
      },
    });

    // Average subscription lifetime
    const canceledSubs = await prisma.subscription.findMany({
      where: {
        canceledAt: { not: null },
      },
      select: {
        createdAt: true,
        canceledAt: true,
      },
    });

    let totalLifetimeDays = 0;
    for (const sub of canceledSubs) {
      if (sub.canceledAt) {
        const lifetime = sub.canceledAt.getTime() - sub.createdAt.getTime();
        totalLifetimeDays += lifetime / (1000 * 60 * 60 * 24);
      }
    }

    const averageLifetimeDays = canceledSubs.length > 0
      ? totalLifetimeDays / canceledSubs.length
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        period: {
          days,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        byTier: Object.fromEntries(
          Object.entries(subscriptionsByTier).map(([tier, count]) => [tier.toUpperCase(), count])
        ),
        byInterval: Object.fromEntries(
          subscriptionsByInterval.map(s => [s.billingInterval || 'monthly', s._count])
        ),
        byStatus: Object.fromEntries(
          subscriptionsByStatus.map(s => [s.status, s._count])
        ),
        trend: newSubscriptionsTrend,
        cancellations: {
          total: canceledSubscriptions.reduce((sum, c) => sum + c._count, 0),
          byReason: Object.fromEntries(
            canceledSubscriptions.map(c => [c.cancelReason || 'unknown', c._count])
          ),
        },
        averageLifetimeDays: Math.round(averageLifetimeDays),
      },
    });
  } catch (error) {
    console.error('Error fetching subscription analytics:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch subscription analytics',
      },
      { status: 500 }
    );
  }
});
