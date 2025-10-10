import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/api-error';

export const dynamic = 'force-dynamic';

/**
 * DELETE /api/support/tickets/[ticketId]
 * Delete a support ticket (user can only delete their own tickets)
 *
 * Auth: Required
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ ticketId: string }> }
) {
  try {
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { ticketId } = await context.params;

    // Check if ticket exists and belongs to user
    const ticket = await prisma.supportTicket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }

    // Ensure user can only delete their own tickets
    if (ticket.userId !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden: You can only delete your own tickets' },
        { status: 403 }
      );
    }

    // Delete the ticket
    await prisma.supportTicket.delete({
      where: { id: ticketId },
    });

    // Log the activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'support_ticket_deleted',
        details: `Support ticket "${ticket.subject}" deleted by user`,
        metadata: {
          ticketId: ticket.id,
          subject: ticket.subject,
        },
      },
    });

    return NextResponse.json({
      message: 'Ticket deleted successfully',
    });

  } catch (error) {
    return handleApiError(error);
  }
}
