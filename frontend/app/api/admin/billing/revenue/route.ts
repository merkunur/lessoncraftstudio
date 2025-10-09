import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { getMRRTrend } from '@/lib/analytics/revenue';
import { getChurnTrend } from '@/lib/analytics/churn';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/admin/billing/revenue
 *
 * Returns revenue trends and detailed breakdowns
 */
export const GET = withAdmin(async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const months = parseInt(searchParams.get('months') || '12');
    const period = searchParams.get('period') || '30';

    const days = parseInt(period);
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get trends and revenue data in parallel
    const [
      mrrTrend,
      churnTrend,
      revenueByTier,
      revenueByInterval,
      topCustomers,
    ] = await Promise.all([
      getMRRTrend(months),
      getChurnTrend(months),

      // Revenue by tier in period
      prisma.payment.groupBy({
        by: ['userId'],
        where: {
          status: 'succeeded',
          createdAt: { gte: startDate, lte: endDate },
        },
        _sum: {
          amount: true,
        },
      }).then(async (results) => {
        // Get user tiers
        const userIds = results.map(r => r.userId);
        const users = await prisma.user.findMany({
          where: { id: { in: userIds } },
          select: { id: true, subscriptionTier: true },
        });

        const tierMap = new Map(users.map(u => [u.id, u.subscriptionTier]));
        const byTier: Record<string, number> = {};

        for (const result of results) {
          const tier = tierMap.get(result.userId)?.toUpperCase() || 'FREE';
          byTier[tier] = (byTier[tier] || 0) + (result._sum.amount || 0);
        }

        return byTier;
      }),

      // Revenue by billing interval
      prisma.subscription.findMany({
        where: {
          status: { in: ['active', 'past_due'] },
        },
        select: {
          billingInterval: true,
          user: {
            select: {
              subscriptionTier: true,
              payments: {
                where: {
                  status: 'succeeded',
                  createdAt: { gte: startDate, lte: endDate },
                },
                select: {
                  amount: true,
                },
              },
            },
          },
        },
      }).then(subs => {
        const byInterval: Record<string, number> = {};

        for (const sub of subs) {
          const interval = sub.billingInterval || 'monthly';
          const revenue = sub.user.payments.reduce((sum, p) => sum + p.amount, 0);
          byInterval[interval] = (byInterval[interval] || 0) + revenue;
        }

        return byInterval;
      }),

      // Top 10 customers by revenue
      prisma.payment.groupBy({
        by: ['userId'],
        where: {
          status: 'succeeded',
          createdAt: { gte: startDate, lte: endDate },
        },
        _sum: {
          amount: true,
        },
        orderBy: {
          _sum: {
            amount: 'desc',
          },
        },
        take: 10,
      }).then(async (results) => {
        const userIds = results.map(r => r.userId);
        const users = await prisma.user.findMany({
          where: { id: { in: userIds } },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            subscriptionTier: true,
          },
        });

        const userMap = new Map(users.map(u => [u.id, u]));

        return results.map(r => {
          const user = userMap.get(r.userId);
          return {
            userId: r.userId,
            email: user?.email || 'Unknown',
            name: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
            tier: user?.subscriptionTier || 'free',
            revenue: r._sum.amount || 0,
          };
        });
      }),
    ]);

    // Calculate total revenue in period
    const totalRevenue = await prisma.payment.aggregate({
      where: {
        status: 'succeeded',
        createdAt: { gte: startDate, lte: endDate },
      },
      _sum: {
        amount: true,
      },
    });

    // Calculate daily revenue trend
    const dailyRevenue = [];
    for (let i = days - 1; i >= 0; i--) {
      const dayStart = new Date(endDate);
      dayStart.setDate(dayStart.getDate() - i);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);

      const revenue = await prisma.payment.aggregate({
        where: {
          status: 'succeeded',
          createdAt: { gte: dayStart, lte: dayEnd },
        },
        _sum: {
          amount: true,
        },
      });

      dailyRevenue.push({
        date: dayStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        revenue: revenue._sum.amount || 0,
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
        total: totalRevenue._sum.amount || 0,
        trends: {
          mrr: mrrTrend,
          churn: churnTrend,
          daily: dailyRevenue,
        },
        breakdown: {
          byTier: revenueByTier,
          byInterval: revenueByInterval,
        },
        topCustomers,
      },
    });
  } catch (error) {
    console.error('Error fetching revenue analytics:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch revenue analytics',
      },
      { status: 500 }
    );
  }
});
