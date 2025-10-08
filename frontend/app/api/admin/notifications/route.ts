import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';

// GET /api/admin/notifications - Get admin notifications
export const GET = withAdminAuth(async (request: NextRequest, user: any) => {
  try {
    // Get recent notifications for admin
    const notifications = await prisma.notification.findMany({
      where: {
        OR: [
          { userId: user.id },
          { userId: null }, // System-wide notifications
        ],
        read: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    // Get system alerts (high priority issues)
    const systemAlerts = [];

    // Check for failed payments in last 24 hours
    const failedPayments = await prisma.payment.count({
      where: {
        status: 'failed',
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });

    if (failedPayments > 0) {
      systemAlerts.push({
        id: 'failed-payments',
        type: 'error',
        title: 'Payment Failures',
        message: `${failedPayments} payment${failedPayments > 1 ? 's' : ''} failed in the last 24 hours`,
        priority: 'high',
        link: '/admin/subscriptions/payments?status=failed',
      });
    }

    // Check for pending support tickets
    const pendingTickets = await prisma.supportTicket.count({
      where: {
        status: 'open',
        priority: 'high',
      },
    });

    if (pendingTickets > 0) {
      systemAlerts.push({
        id: 'pending-tickets',
        type: 'warning',
        title: 'Support Tickets',
        message: `${pendingTickets} high priority ticket${pendingTickets > 1 ? 's' : ''} pending`,
        priority: 'medium',
        link: '/admin/support/tickets?priority=high',
      });
    }

    return NextResponse.json({
      notifications,
      systemAlerts,
      totalUnread: notifications.length,
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
});

// POST /api/admin/notifications - Mark notifications as read
export const POST = withAdminAuth(async (request: NextRequest, user: any) => {
  try {
    const body = await request.json();
    const { notificationIds, markAll } = body;

    if (markAll) {
      // Mark all notifications as read
      await prisma.notification.updateMany({
        where: {
          OR: [
            { userId: user.id },
            { userId: null },
          ],
          read: false,
        },
        data: {
          read: true,
          readAt: new Date(),
        },
      });
    } else if (notificationIds && Array.isArray(notificationIds)) {
      // Mark specific notifications as read
      await prisma.notification.updateMany({
        where: {
          id: { in: notificationIds },
          OR: [
            { userId: user.id },
            { userId: null },
          ],
        },
        data: {
          read: true,
          readAt: new Date(),
        },
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid request. Provide notificationIds or markAll flag.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Mark notifications error:', error);
    return NextResponse.json(
      { error: 'Failed to update notifications' },
      { status: 500 }
    );
  }
});