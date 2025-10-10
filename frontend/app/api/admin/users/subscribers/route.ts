import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const GET = withAdmin(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const plan = searchParams.get('plan') || '';
    const status = searchParams.get('status') || '';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      subscriptionTier: { in: ['core', 'full'] },
      subscription: {
        isNot: null,
      },
    };

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (plan) {
      where.subscription = {
        ...where.subscription,
        planName: plan,
      };
    }

    if (status) {
      where.subscription = {
        ...where.subscription,
        status,
      };
    }

    // Get subscribers
    const [subscribers, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          subscription: true,
          payments: {
            select: {
              amount: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    // Calculate stats
    const [totalSubscribers, activeSubscribers, allPayments] = await Promise.all([
      prisma.user.count({
        where: {
          subscriptionTier: { in: ['core', 'full'] },
        },
      }),
      prisma.user.count({
        where: {
          subscriptionTier: { in: ['core', 'full'] },
          subscription: {
            status: 'active',
          },
        },
      }),
      prisma.payment.aggregate({
        where: {
          status: 'succeeded',
          user: {
            subscriptionTier: { in: ['core', 'full'] },
          },
        },
        _sum: {
          amount: true,
        },
      }),
    ]);

    // Calculate MRR (Monthly Recurring Revenue)
    const activeSubscriptions = await prisma.subscription.findMany({
      where: {
        status: 'active',
      },
      include: {
        user: true,
      },
    });

    let mrr = 0;
    activeSubscriptions.forEach((sub) => {
      // Estimate monthly revenue based on plan
      const planPrices: Record<string, number> = {
        core_monthly: 699,
        core_yearly: 699 * 12 * 0.8 / 12, // 20% discount
        full_monthly: 999,
        full_yearly: 999 * 12 * 0.8 / 12,
      };
      mrr += planPrices[sub.planName] || 0;
    });

    // Calculate churn for this month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const churnedThisMonth = await prisma.subscription.count({
      where: {
        canceledAt: {
          gte: startOfMonth,
        },
      },
    });

    const stats = {
      total: totalSubscribers,
      active: activeSubscribers,
      mrr: Math.round(mrr / 100),
      totalRevenue: Math.round((allPayments._sum.amount || 0) / 100),
      churnedThisMonth,
    };

    return NextResponse.json({
      subscribers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats,
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
});
