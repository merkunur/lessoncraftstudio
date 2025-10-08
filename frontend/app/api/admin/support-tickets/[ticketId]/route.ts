import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/api-error';

/**
 * PATCH /api/admin/support-tickets/[ticketId]
 * Update a support ticket (status, response, etc.)
 *
 * Auth: Requires admin
 */
export const PATCH = withAdmin(async (
  request: NextRequest,
  user: any,
  context: { params: Promise<{ ticketId: string }> }
) => {
  try {
    const { ticketId } = await context.params;
    const body = await request.json();
    const { status, response, priority } = body;

    // Check if ticket exists
    const ticket = await prisma.supportTicket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }

    // Build update data
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (status) {
      updateData.status = status;

      // If marked as resolved, set resolved fields
      if (status === 'resolved' || status === 'closed') {
        updateData.resolved = true;
        updateData.resolvedAt = new Date();
      }
    }

    if (response) {
      updateData.response = response;
      updateData.respondedAt = new Date();
    }

    if (priority) {
      updateData.priority = priority;
    }

    // Update the ticket
    const updatedTicket = await prisma.supportTicket.update({
      where: { id: ticketId },
      data: updateData,
    });

    // Log the activity if ticket has a userId
    if (ticket.userId) {
      await prisma.activityLog.create({
        data: {
          userId: ticket.userId,
          action: 'support_ticket_updated',
          details: `Support ticket "${ticket.subject}" updated by admin. Status: ${updateData.status || ticket.status}${response ? ', Response sent' : ''}`,
          metadata: {
            ticketId: ticket.id,
            status: updateData.status,
            hasResponse: !!response,
          },
        },
      });
    }

    return NextResponse.json({
      message: 'Ticket updated successfully',
      ticket: updatedTicket,
    });

  } catch (error) {
    return handleApiError(error);
  }
});

/**
 * DELETE /api/admin/support-tickets/[ticketId]
 * Delete a support ticket
 *
 * Auth: Requires admin
 */
export const DELETE = withAdmin(async (
  request: NextRequest,
  user: any,
  context: { params: Promise<{ ticketId: string }> }
) => {
  try {
    const { ticketId } = await context.params;

    // Check if ticket exists
    const ticket = await prisma.supportTicket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }

    // Delete the ticket
    await prisma.supportTicket.delete({
      where: { id: ticketId },
    });

    // Log the activity if ticket has a userId
    if (ticket.userId) {
      await prisma.activityLog.create({
        data: {
          userId: ticket.userId,
          action: 'support_ticket_deleted',
          details: `Support ticket "${ticket.subject}" deleted by admin`,
          metadata: {
            ticketId: ticket.id,
            subject: ticket.subject,
          },
        },
      });
    }

    return NextResponse.json({
      message: 'Ticket deleted successfully',
    });

  } catch (error) {
    return handleApiError(error);
  }
});
