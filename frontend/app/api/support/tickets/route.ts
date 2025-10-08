import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/api-error';
import { z } from 'zod';

/**
 * POST /api/support/tickets
 * Create a new support ticket
 *
 * Auth: Optional (can be submitted without account)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation schema
    const ticketSchema = z.object({
      subject: z.string().min(5, 'Subject must be at least 5 characters'),
      message: z.string().min(20, 'Message must be at least 20 characters'),
      category: z.enum(['bug', 'feature_request', 'billing', 'technical', 'other']).optional(),
      priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
      email: z.string().email('Invalid email address'),
      name: z.string().optional(),
      userId: z.string().optional(),
    });

    const validationResult = ticketSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Try to get current user (optional)
    let user = null;
    try {
      user = await getCurrentUser(request);
    } catch (error) {
      // User not authenticated, that's okay for support tickets
    }

    // Create the support ticket
    const ticket = await prisma.supportTicket.create({
      data: {
        userId: user?.id || data.userId || null,
        email: data.email,
        name: data.name || null,
        subject: data.subject,
        message: data.message,
        category: data.category || 'other',
        priority: data.priority || 'medium',
        status: 'open',
      },
    });

    // Log activity if user is authenticated
    if (user) {
      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action: 'support_ticket_created',
          details: `Support ticket created: "${data.subject}". Category: ${ticket.category}, Priority: ${ticket.priority}`,
          metadata: {
            ticketId: ticket.id,
            category: ticket.category,
            priority: ticket.priority,
          },
        },
      });
    }

    return NextResponse.json({
      message: 'Support ticket submitted successfully',
      ticket: {
        id: ticket.id,
        subject: ticket.subject,
        status: ticket.status,
        createdAt: ticket.createdAt,
      },
    }, { status: 201 });

  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * GET /api/support/tickets
 * Get user's support tickets
 *
 * Auth: Required
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's tickets
    const tickets = await prisma.supportTicket.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        subject: true,
        message: true,
        category: true,
        priority: true,
        status: true,
        response: true,
        respondedAt: true,
        resolved: true,
        resolvedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      tickets,
      total: tickets.length,
    });

  } catch (error) {
    return handleApiError(error);
  }
}
