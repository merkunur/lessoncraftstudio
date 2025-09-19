import { NextRequest, NextResponse } from 'next/server';
import { SupportTicket } from '@/types/help';

// GET /api/help/tickets - Get user's support tickets
export async function GET(request: NextRequest) {
  try {
    const tickets: SupportTicket[] = [
      {
        id: 'ticket_1',
        userId: 'user_123',
        userEmail: 'user@example.com',
        subject: 'Cannot export worksheets as PDF',
        description: 'When I try to export my worksheet as PDF, the download never starts. I\'ve tried different browsers but the issue persists.',
        category: 'bug',
        priority: 'high',
        status: 'in_progress',
        assignedTo: 'support_agent_1',
        messages: [
          {
            id: 'msg_1',
            ticketId: 'ticket_1',
            userId: 'user_123',
            userName: 'John Doe',
            userRole: 'user',
            message: 'When I try to export my worksheet as PDF, the download never starts. I\'ve tried different browsers but the issue persists.',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            isInternal: false
          },
          {
            id: 'msg_2',
            ticketId: 'ticket_1',
            userId: 'support_1',
            userName: 'Support Team',
            userRole: 'support',
            message: 'Thank you for reporting this issue. We\'re investigating the PDF export functionality. Can you please let us know which browser version you\'re using?',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            isInternal: false
          }
        ],
        tags: ['pdf', 'export', 'bug'],
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'ticket_2',
        userId: 'user_123',
        userEmail: 'user@example.com',
        subject: 'Feature Request: Bulk worksheet creation',
        description: 'It would be great if we could create multiple worksheets at once using a template.',
        category: 'feature',
        priority: 'low',
        status: 'open',
        messages: [
          {
            id: 'msg_3',
            ticketId: 'ticket_2',
            userId: 'user_123',
            userName: 'John Doe',
            userRole: 'user',
            message: 'It would be great if we could create multiple worksheets at once using a template. This would save a lot of time for creating similar worksheets for different classes.',
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            isInternal: false
          }
        ],
        tags: ['feature-request', 'bulk', 'worksheets'],
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'ticket_3',
        userId: 'user_123',
        userEmail: 'user@example.com',
        subject: 'Math symbols not displaying correctly',
        description: 'Some mathematical symbols appear as question marks in my worksheets.',
        category: 'bug',
        priority: 'medium',
        status: 'resolved',
        assignedTo: 'support_agent_2',
        messages: [
          {
            id: 'msg_4',
            ticketId: 'ticket_3',
            userId: 'user_123',
            userName: 'John Doe',
            userRole: 'user',
            message: 'Some mathematical symbols appear as question marks in my worksheets. This happens with fractions and square root symbols.',
            timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            isInternal: false
          },
          {
            id: 'msg_5',
            ticketId: 'ticket_3',
            userId: 'support_2',
            userName: 'Tech Support',
            userRole: 'support',
            message: 'This issue has been fixed in the latest update. Please clear your browser cache and try again. The math symbols should now display correctly.',
            timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
            isInternal: false
          }
        ],
        tags: ['math', 'symbols', 'display', 'resolved'],
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        resolvedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        satisfaction: 5
      }
    ];

    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Failed to get tickets:', error);
    return NextResponse.json(
      { error: 'Failed to get tickets' },
      { status: 500 }
    );
  }
}

// POST /api/help/tickets - Create new support ticket
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newTicket: SupportTicket = {
      id: `ticket_${Date.now()}`,
      userId: 'user_123', // In production, get from session
      userEmail: 'user@example.com',
      subject: body.subject,
      description: body.description,
      category: body.category || 'question',
      priority: body.priority || 'medium',
      status: 'open',
      messages: [
        {
          id: `msg_${Date.now()}`,
          ticketId: `ticket_${Date.now()}`,
          userId: 'user_123',
          userName: 'John Doe',
          userRole: 'user',
          message: body.description,
          timestamp: new Date().toISOString(),
          isInternal: false
        }
      ],
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error('Failed to create ticket:', error);
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    );
  }
}