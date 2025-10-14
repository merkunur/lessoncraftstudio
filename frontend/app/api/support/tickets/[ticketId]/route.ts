import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { sendEmail } from '@/lib/email';

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

    // Send email notification if a response was added
    if (body.response) {
      try {
        const recipientEmail = updatedTicket.user?.email || updatedTicket.email;
        const recipientName = updatedTicket.user
          ? `${updatedTicket.user.firstName} ${updatedTicket.user.lastName}`
          : updatedTicket.name;

        const emailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
              .response-box { background: white; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 4px; }
              .original-message { background: #f3f4f6; padding: 15px; margin: 20px 0; border-radius: 4px; font-size: 0.9em; }
              .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 0.85em; color: #6b7280; border-top: 1px solid #e5e7eb; }
              .status-badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 0.85em; font-weight: 600; }
              .btn { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">Support Ticket Response</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Ticket #${updatedTicket.id.slice(0, 8)}</p>
              </div>

              <div class="content">
                <p>Hi ${recipientName},</p>

                <p>Our support team has responded to your ticket:</p>

                <p><strong>Subject:</strong> ${updatedTicket.subject}</p>
                <p>
                  <strong>Status:</strong>
                  <span class="status-badge" style="background: ${
                    updatedTicket.status === 'resolved' ? '#10b981' :
                    updatedTicket.status === 'in_progress' ? '#f59e0b' :
                    updatedTicket.status === 'closed' ? '#6b7280' : '#3b82f6'
                  }; color: white;">
                    ${updatedTicket.status?.toUpperCase()}
                  </span>
                </p>

                <div class="response-box">
                  <h3 style="margin-top: 0; color: #667eea;">Response from Support Team:</h3>
                  <p style="white-space: pre-wrap;">${body.response}</p>
                </div>

                <div class="original-message">
                  <strong>Your Original Message:</strong>
                  <p style="white-space: pre-wrap; margin: 10px 0 0 0;">${updatedTicket.message}</p>
                </div>

                <p style="margin-top: 30px;">If you have any additional questions or concerns, please reply to this email or submit a new support ticket.</p>

                <div style="text-align: center;">
                  <a href="https://www.lessoncraftstudio.com/contact" class="btn">Contact Support</a>
                </div>
              </div>

              <div class="footer">
                <p><strong>LessonCraft Studio</strong></p>
                <p>This is an automated message from our support system.</p>
                <p style="margin-top: 10px;">
                  <a href="https://www.lessoncraftstudio.com" style="color: #667eea; text-decoration: none;">www.lessoncraftstudio.com</a>
                </p>
              </div>
            </div>
          </body>
          </html>
        `;

        await sendEmail(
          {
            to: recipientEmail,
            subject: `Re: ${updatedTicket.subject}`,
            html: emailHtml,
            text: `Hi ${recipientName},\n\nOur support team has responded to your ticket:\n\nSubject: ${updatedTicket.subject}\nStatus: ${updatedTicket.status}\n\nResponse:\n${body.response}\n\nYour Original Message:\n${updatedTicket.message}\n\nIf you have any additional questions, please reply to this email or visit https://www.lessoncraftstudio.com/contact\n\nBest regards,\nLessonCraft Studio Support Team`,
            replyTo: process.env.EMAIL_FROM || 'support@lessoncraftstudio.com',
            metadata: {
              ticketId: updatedTicket.id,
              type: 'support_response',
              adminEmail: admin.email,
            },
          },
          {
            priority: 'high',
            immediate: true,
          }
        );

        console.log('✅ Email notification sent to ' + recipientEmail + ' for ticket ' + ticketId);
      } catch (emailError) {
        console.error('⚠️ Failed to send email notification for ticket ' + ticketId + ':', emailError);
        // Don't fail the entire request if email fails
      }
    }

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
