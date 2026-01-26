import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/emails/logs
 *
 * Returns email delivery logs with pagination and filtering
 */
export const GET = withAdmin(async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const status = searchParams.get('status'); // 'pending', 'sent', 'delivered', 'opened', 'bounced', 'failed'
    const type = searchParams.get('type'); // 'transactional', 'marketing', 'notification', 'campaign'
    const email = searchParams.get('email');
    const days = parseInt(searchParams.get('days') || '7');

    const skip = (page - 1) * limit;

    // Build filter conditions
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const where: any = {
      createdAt: { gte: startDate },
    };

    if (status) {
      where.status = status;
    }

    if (type) {
      where.type = type;
    }

    if (email) {
      where.email = { contains: email, mode: 'insensitive' };
    }

    // Get logs with count in parallel
    const [logs, total, statusCounts, typeCounts, dailyStats] = await Promise.all([
      prisma.emailLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          subject: true,
          type: true,
          status: true,
          provider: true,
          providerId: true,
          errorMessage: true,
          sentAt: true,
          deliveredAt: true,
          openedAt: true,
          bouncedAt: true,
          createdAt: true,
        },
      }),
      prisma.emailLog.count({ where }),
      prisma.emailLog.groupBy({
        by: ['status'],
        _count: true,
        where: {
          createdAt: { gte: startDate },
        },
      }),
      prisma.emailLog.groupBy({
        by: ['type'],
        _count: true,
        where: {
          createdAt: { gte: startDate },
        },
      }),
      // Daily send counts for the period
      (async () => {
        const stats = [];
        for (let i = Math.min(days - 1, 13); i >= 0; i--) {
          const dayStart = new Date();
          dayStart.setDate(dayStart.getDate() - i);
          dayStart.setHours(0, 0, 0, 0);

          const dayEnd = new Date(dayStart);
          dayEnd.setHours(23, 59, 59, 999);

          const count = await prisma.emailLog.count({
            where: {
              createdAt: { gte: dayStart, lte: dayEnd },
            },
          });

          stats.push({
            date: dayStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            count,
          });
        }
        return stats;
      })(),
    ]);

    // Calculate delivery rate
    const sentCount = statusCounts.find(s => s.status === 'sent')?._count || 0;
    const deliveredCount = statusCounts.find(s => s.status === 'delivered')?._count || 0;
    const openedCount = statusCounts.find(s => s.status === 'opened')?._count || 0;
    const clickedCount = statusCounts.find(s => s.status === 'clicked')?._count || 0;
    const bouncedCount = statusCounts.find(s => s.status === 'bounced')?._count || 0;
    const failedCount = statusCounts.find(s => s.status === 'failed')?._count || 0;

    const totalSentOrDelivered = sentCount + deliveredCount + openedCount + clickedCount;
    const deliveryRate = totalSentOrDelivered > 0
      ? ((totalSentOrDelivered - bouncedCount) / totalSentOrDelivered * 100).toFixed(1)
      : 0;
    const openRate = totalSentOrDelivered > 0
      ? ((openedCount + clickedCount) / totalSentOrDelivered * 100).toFixed(1)
      : 0;

    // Format logs for response
    const formattedLogs = logs.map(log => ({
      id: log.id,
      email: log.email,
      subject: log.subject,
      type: log.type,
      status: log.status,
      provider: log.provider,
      providerId: log.providerId,
      errorMessage: log.errorMessage,
      sentAt: log.sentAt?.toISOString(),
      deliveredAt: log.deliveredAt?.toISOString(),
      openedAt: log.openedAt?.toISOString(),
      bouncedAt: log.bouncedAt?.toISOString(),
      createdAt: log.createdAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: {
        logs: formattedLogs,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
        summary: {
          period: {
            days,
            startDate: startDate.toISOString(),
            endDate: new Date().toISOString(),
          },
          totalEmails: total,
          deliveryRate: parseFloat(deliveryRate as string),
          openRate: parseFloat(openRate as string),
          byStatus: Object.fromEntries(
            statusCounts.map(s => [s.status, s._count])
          ),
          byType: Object.fromEntries(
            typeCounts.map(t => [t.type, t._count])
          ),
          dailyTrend: dailyStats,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching email logs:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch email logs',
      },
      { status: 500 }
    );
  }
});
