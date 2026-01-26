import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/webhooks
 *
 * Returns webhook event logs with pagination and filtering
 */
export const GET = withAdmin(async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const status = searchParams.get('status'); // 'processing', 'processed', 'failed'
    const eventType = searchParams.get('eventType');
    const days = parseInt(searchParams.get('days') || '7');

    const skip = (page - 1) * limit;

    // Build filter conditions
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const where: any = {
      processedAt: { gte: startDate },
    };

    if (status) {
      where.status = status;
    }

    if (eventType) {
      where.eventType = eventType;
    }

    // Get events with count in parallel
    const [events, total, statusCounts, eventTypeCounts] = await Promise.all([
      prisma.webhookEvent.findMany({
        where,
        orderBy: { processedAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          stripeEventId: true,
          eventType: true,
          status: true,
          processedAt: true,
          errorMessage: true,
          // Optionally include payload summary (first 200 chars)
          payload: true,
        },
      }),
      prisma.webhookEvent.count({ where }),
      prisma.webhookEvent.groupBy({
        by: ['status'],
        _count: true,
        where: {
          processedAt: { gte: startDate },
        },
      }),
      prisma.webhookEvent.groupBy({
        by: ['eventType'],
        _count: true,
        where: {
          processedAt: { gte: startDate },
        },
        orderBy: {
          _count: {
            eventType: 'desc',
          },
        },
        take: 10,
      }),
    ]);

    // Format events for response
    const formattedEvents = events.map((event: {
      id: string;
      stripeEventId: string;
      eventType: string;
      status: string;
      processedAt: Date;
      errorMessage: string | null;
      payload: any;
    }) => ({
      id: event.id,
      stripeEventId: event.stripeEventId,
      eventType: event.eventType,
      status: event.status,
      processedAt: event.processedAt.toISOString(),
      errorMessage: event.errorMessage,
      // Include minimal payload info (e.g., customer ID if present)
      payloadSummary: event.payload
        ? {
            customer: (event.payload as any)?.customer,
            subscription: (event.payload as any)?.subscription,
            amount: (event.payload as any)?.amount_total || (event.payload as any)?.amount_due,
          }
        : null,
    }));

    return NextResponse.json({
      success: true,
      data: {
        events: formattedEvents,
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
          byStatus: Object.fromEntries(
            statusCounts.map((s: { status: string; _count: number }) => [s.status, s._count])
          ),
          byEventType: Object.fromEntries(
            eventTypeCounts.map((e: { eventType: string; _count: number }) => [e.eventType, e._count])
          ),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching webhook events:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch webhook events',
      },
      { status: 500 }
    );
  }
});
