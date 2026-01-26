import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET /api/admin/dashboard/stats - Get real dashboard statistics
export const GET = withAdminAuth(async (request: NextRequest) => {
  try {
    // Get date ranges
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // User Stats
    const [
      totalUsers,
      newUsersThisMonth,
      newUsersLastMonth,
      activeUsers,
      verifiedUsers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: { createdAt: { gte: startOfMonth } },
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: startOfLastMonth,
            lte: endOfLastMonth,
          },
        },
      }),
      prisma.user.count({
        where: {
          lastLoginAt: { gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) }, // Active in last 30 days
        },
      }),
      prisma.user.count({
        where: { emailVerified: true },
      }),
    ]);

    const userGrowth = newUsersLastMonth > 0
      ? ((newUsersThisMonth - newUsersLastMonth) / newUsersLastMonth * 100).toFixed(1)
      : newUsersThisMonth > 0 ? 100 : 0;

    // Subscription Stats
    const [
      activeSubscriptions,
      subscriptionsByTier,
      canceledSubscriptions,
    ] = await Promise.all([
      prisma.subscription.count({
        where: { status: 'active' },
      }),
      prisma.user.groupBy({
        by: ['subscriptionTier'],
        _count: { subscriptionTier: true },
      }),
      prisma.subscription.count({
        where: { status: 'canceled' },
      }),
    ]);

    // Revenue Stats (from payments)
    const [
      paymentsThisMonth,
      paymentsLastMonth,
      paymentsToday,
    ] = await Promise.all([
      prisma.payment.aggregate({
        where: {
          createdAt: { gte: startOfMonth },
          status: 'succeeded',
        },
        _sum: { amount: true },
      }),
      prisma.payment.aggregate({
        where: {
          createdAt: {
            gte: startOfLastMonth,
            lte: endOfLastMonth,
          },
          status: 'succeeded',
        },
        _sum: { amount: true },
      }),
      prisma.payment.aggregate({
        where: {
          createdAt: { gte: startOfToday },
          status: 'succeeded',
        },
        _sum: { amount: true },
      }),
    ]);

    const mrrThisMonth = paymentsThisMonth._sum.amount || 0;
    const mrrLastMonth = paymentsLastMonth._sum.amount || 0;
    const revenueGrowth = mrrLastMonth > 0
      ? ((mrrThisMonth - mrrLastMonth) / mrrLastMonth * 100).toFixed(1)
      : mrrThisMonth > 0 ? 100 : 0;

    // Recent Activity (from ActivityLog)
    const recentActivity = await prisma.activityLog.findMany({
      where: {
        action: {
          in: [
            'subscription_upgraded',
            'subscription_created',
            'user_registered',
            'subscription_canceled',
            'payment_received',
            'login',
          ],
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    // Top Users by activity or payments
    const topUsers = await prisma.user.findMany({
      where: {
        subscriptionTier: { in: ['core', 'full'] },
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        subscriptionTier: true,
        _count: {
          select: {
            payments: true,
            activityLogs: true,
          },
        },
      },
    });

    // Format tier counts
    const tierCounts = subscriptionsByTier.reduce((acc, item) => {
      acc[item.subscriptionTier || 'free'] = item._count.subscriptionTier;
      return acc;
    }, {} as Record<string, number>);

    // Format activity for frontend
    const formattedActivity = recentActivity.map((activity) => {
      const userName = activity.user?.firstName
        ? `${activity.user.firstName} ${activity.user.lastName || ''}`.trim()
        : activity.user?.email || 'A user';

      let message = '';
      let icon = 'new_user';

      switch (activity.action) {
        case 'subscription_upgraded':
          message = `${userName} upgraded their subscription`;
          icon = 'upgrade';
          break;
        case 'subscription_created':
          message = `${userName} started a subscription`;
          icon = 'upgrade';
          break;
        case 'user_registered':
          message = `${userName} signed up`;
          icon = 'new_user';
          break;
        case 'subscription_canceled':
          message = `${userName} canceled their subscription`;
          icon = 'cancel';
          break;
        case 'payment_received':
          message = `Payment received from ${userName}`;
          icon = 'payment';
          break;
        case 'login':
          message = `${userName} logged in`;
          icon = 'login';
          break;
        default:
          message = activity.details || `${userName} - ${activity.action}`;
      }

      const timeAgo = getTimeAgo(activity.createdAt);

      return {
        id: activity.id,
        type: activity.action,
        message,
        time: timeAgo,
        icon,
      };
    });

    // Format top users for frontend
    const formattedTopUsers = topUsers.map((user) => ({
      id: user.id,
      name: user.firstName
        ? `${user.firstName} ${user.lastName || ''}`.trim()
        : user.email.split('@')[0],
      email: user.email,
      activity: user._count.activityLogs,
      plan: user.subscriptionTier === 'full' ? 'Full' : user.subscriptionTier === 'core' ? 'Core' : 'Free',
    }));

    return NextResponse.json({
      stats: {
        users: {
          total: totalUsers,
          new: newUsersThisMonth,
          active: activeUsers,
          verified: verifiedUsers,
          growth: parseFloat(userGrowth as string),
        },
        revenue: {
          mrr: Math.round(mrrThisMonth * 100) / 100,
          arr: Math.round(mrrThisMonth * 12 * 100) / 100,
          today: Math.round((paymentsToday._sum.amount || 0) * 100) / 100,
          growth: parseFloat(revenueGrowth as string),
        },
        subscriptions: {
          active: activeSubscriptions,
          byTier: tierCounts,
          canceled: canceledSubscriptions,
          growth: 0, // Would need historical data to calculate
        },
        usage: {
          worksheets: 0, // Would need usage tracking to calculate
          downloads: 0,
          generators: 33, // Known number of generators
          growth: 0,
        },
      },
      recentActivity: formattedActivity,
      topUsers: formattedTopUsers,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
});

// Helper function to format time ago
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
}
