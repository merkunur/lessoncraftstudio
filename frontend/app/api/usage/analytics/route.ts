import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getUserUsageStats } from '@/lib/usage-tracking';
import { prisma } from '@/lib/prisma';

// GET /api/usage/analytics - Get user's usage analytics
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || 'current'; // current, last, year

    if (period === 'current') {
      // Get current month's stats
      const stats = await getUserUsageStats(user.id);
      return NextResponse.json(stats);
    } else if (period === 'last') {
      // Get last 3 months
      const now = new Date();
      const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);

      const usage = await prisma.worksheetUsage.findMany({
        where: {
          userId: user.id,
          createdAt: {
            gte: threeMonthsAgo,
          },
        },
        select: {
          action: true,
          appName: true,
          outputFormat: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Group by month
      const byMonth = usage.reduce((acc, item) => {
        const month = item.createdAt.toISOString().slice(0, 7); // YYYY-MM
        if (!acc[month]) {
          acc[month] = {
            total: 0,
            downloads: 0,
            generates: 0,
            views: 0,
            generators: new Set(),
          };
        }
        acc[month].total++;
        if (item.action === 'download') acc[month].downloads++;
        if (item.action === 'generate') {
          acc[month].generates++;
          acc[month].generators.add(item.appName);
        }
        if (item.action === 'view') acc[month].views++;
        return acc;
      }, {} as any);

      // Convert to array format
      const monthlyStats = Object.entries(byMonth).map(([month, stats]: [string, any]) => ({
        month,
        total: stats.total,
        downloads: stats.downloads,
        generates: stats.generates,
        views: stats.views,
        uniqueGenerators: stats.generators.size,
      }));

      return NextResponse.json({
        period: 'last_3_months',
        stats: monthlyStats,
        totalUsage: usage.length,
      });
    } else if (period === 'year') {
      // Get current year stats
      const year = new Date().getFullYear();
      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 11, 31, 23, 59, 59);

      const yearlyUsage = await prisma.worksheetUsage.groupBy({
        by: ['action'],
        where: {
          userId: user.id,
          createdAt: {
            gte: startOfYear,
            lte: endOfYear,
          },
        },
        _count: {
          action: true,
        },
      });

      // Get most used generators
      const topGenerators = await prisma.worksheetUsage.groupBy({
        by: ['appName'],
        where: {
          userId: user.id,
          action: 'generate',
          createdAt: {
            gte: startOfYear,
            lte: endOfYear,
          },
        },
        _count: {
          appName: true,
        },
        orderBy: {
          _count: {
            appName: 'desc',
          },
        },
        take: 10,
      });

      return NextResponse.json({
        period: 'year',
        year,
        actionSummary: yearlyUsage.reduce((acc, item) => {
          acc[item.action] = item._count.action;
          return acc;
        }, {} as Record<string, number>),
        topGenerators: topGenerators.map(item => ({
          name: item.appName,
          count: item._count.appName,
        })),
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid period. Use "current", "last", or "year"' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Get analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

// POST /api/usage/analytics - Track a usage event
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { appName, action, configuration, outputFormat } = body;

    if (!appName || !action) {
      return NextResponse.json(
        { error: 'App name and action are required' },
        { status: 400 }
      );
    }

    // Import and use the tracking function
    const { trackUsage } = await import('@/lib/usage-tracking');
    
    const usage = await trackUsage({
      userId: user.id,
      appName,
      action,
      configuration,
      outputFormat,
      sessionId: request.headers.get('x-session-id') || undefined,
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
    });

    // Check if quota was exceeded (for downloads)
    if (action === 'download') {
      const { checkDownloadQuota } = await import('@/lib/usage-tracking');
      const quotaCheck = await checkDownloadQuota(user.id);
      
      if (!quotaCheck.allowed) {
        // Still track the attempt but mark as blocked
        return NextResponse.json(
          {
            tracked: true,
            allowed: false,
            reason: quotaCheck.reason,
            quotaStatus: quotaCheck,
          },
          { status: 403 }
        );
      }
    }

    return NextResponse.json({
      tracked: true,
      usageId: usage.id,
      timestamp: usage.createdAt,
    });
  } catch (error) {
    console.error('Track usage error:', error);
    return NextResponse.json(
      { error: 'Failed to track usage' },
      { status: 500 }
    );
  }
}