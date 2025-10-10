import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdmin } from '@/lib/server-auth';

export const dynamic = 'force-dynamic';

// GET /api/admin/settings/security/audit-log - Get security audit log
export const GET = withAdmin(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const action = searchParams.get('action');
    const userId = searchParams.get('userId');
    const days = parseInt(searchParams.get('days') || '30');

    // Calculate date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Build where clause
    const where: any = {
      createdAt: {
        gte: startDate,
      },
    };

    // Filter by security-related actions
    const securityActions = [
      'login',
      'logout',
      'failed_login',
      'password_changed',
      'password_reset_requested',
      'email_verified',
      'role_assigned',
      'role_revoked',
      'security_settings_updated',
      'account_suspended',
      'account_unsuspended',
      '2fa_enabled',
      '2fa_disabled',
      'session_created',
      'session_revoked',
    ];

    if (action && action !== 'all') {
      where.action = action;
    } else {
      where.action = {
        in: securityActions,
      };
    }

    if (userId) {
      where.userId = userId;
    }

    // Get total count
    const total = await prisma.activityLog.count({ where });

    // Get logs
    const logs = await prisma.activityLog.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Get action statistics
    const actionStats = await prisma.activityLog.groupBy({
      by: ['action'],
      where: {
        createdAt: {
          gte: startDate,
        },
        action: {
          in: securityActions,
        },
      },
      _count: {
        action: true,
      },
      orderBy: {
        _count: {
          action: 'desc',
        },
      },
    });

    return NextResponse.json({
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: actionStats.map((stat) => ({
        action: stat.action,
        count: stat._count.action,
      })),
    });
  } catch (error) {
    console.error('Error fetching audit log:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audit log' },
      { status: 500 }
    );
  }
});
