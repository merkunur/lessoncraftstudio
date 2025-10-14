import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

interface TicketUpdateData {
  status?: string;
  priority?: string;
  response?: string;
  resolved?: boolean;
  assignedTo?: string;
  satisfaction?: number;
}

// GET /api/support/tickets/[ticketId] - Get single ticket
export async function GET(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  try {
    await requireAdmin(request);
    const { ticketId } = params;

    const ticket = await prisma.supportTicket.findUnique({
      where: { id: ticketId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            subscriptionTier: true,
          },
        },
      },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    console.error('Error fetching support ticket:', error);

    if (error instanceof Error) {
      if (error.message === 'Unauthorized') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      if (error.message.includes('Forbidden')) {
        return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
      }
    }

    return NextResponse.json({ error: 'Failed to fetch support ticket' }, { status: 500 });
  }
}

// PATCH /api/support/tickets/[ticketId] - Update ticket
export async function PATCH(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  try {
    const admin = await requireAdmin(request);
    const { ticketId } = params;
    const body: TicketUpdateData = await request.json();

    const validStatuses = ['open', 'in_progress', 'waiting', 'resolved', 'closed'];
    if (body.status && !validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: ' + validStatuses.join(', ') },
        { status: 400 }
      );
    }

    const validPriorities = ['low', 'medium', 'high', 'urgent'];
    if (body.priority && !validPriorities.includes(body.priority)) {
      return NextResponse.json(
        { error: 'Invalid priority. Must be one of: ' + validPriorities.join(', ') },
        { status: 400 }
      );
    }

    if (body.satisfaction !== undefined && (body.satisfaction < 1 || body.satisfaction > 5)) {
      return NextResponse.json(
        { error: 'Satisfaction rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const existingTicket = await prisma.supportTicket.findUnique({
      where: { id: ticketId },
    });

    if (!existingTicket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    const updateData: any = { ...body, updatedAt: new Date() };

    if (body.response && !existingTicket.respondedAt) {
      updateData.respondedAt = new Date();
    }

    if (body.resolved === true && !existingTicket.resolved) {
      updateData.resolvedAt = new Date();
    }

    if (body.assignedTo === '') {
      updateData.assignedTo = null;
    }

    const updatedTicket = await prisma.supportTicket.update({
      where: { id: ticketId },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            subscriptionTier: true,
          },
        },
      },
    });

    console.log('✅ Support ticket updated by admin ' + admin.email + ' - Ticket ID: ' + ticketId);

    return NextResponse.json({
      success: true,
      message: 'Ticket updated successfully',
      data: updatedTicket,
    });
  } catch (error) {
    console.error('Error updating support ticket:', error);

    if (error instanceof Error) {
      if (error.message === 'Unauthorized') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      if (error.message.includes('Forbidden')) {
        return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
      }
    }

    return NextResponse.json({ error: 'Failed to update support ticket' }, { status: 500 });
  }
}

// DELETE /api/support/tickets/[ticketId] - Delete ticket
export async function DELETE(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  try {
    const admin = await requireAdmin(request);
    const { ticketId } = params;

    const ticket = await prisma.supportTicket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    await prisma.supportTicket.delete({
      where: { id: ticketId },
    });

    console.log('✅ Support ticket deleted by admin ' + admin.email + ' - Ticket ID: ' + ticketId);

    return NextResponse.json({
      success: true,
      message: 'Ticket deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting support ticket:', error);

    if (error instanceof Error) {
      if (error.message === 'Unauthorized') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      if (error.message.includes('Forbidden')) {
        return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
      }
    }

    return NextResponse.json({ error: 'Failed to delete support ticket' }, { status: 500 });
  }
}
