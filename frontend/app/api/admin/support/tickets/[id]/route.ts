import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

interface MessageData {
  message: string;
  isInternal: boolean;
  attachments?: string[];
}

interface TicketUpdate {
  status?: 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId?: string;
  tags?: string[];
  subject?: string;
  category?: string;
}

// Mock ticket data (in production, this would come from database)
const getTicket = (id: string) => {
  const tickets = {
    '1': {
      id: '1',
      ticketNumber: 'TKT-001',
      subject: 'Cannot download worksheets',
      status: 'open',
      priority: 'high',
      category: 'Technical',
      customer: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        plan: 'core',
        joinDate: '2024-01-15',
        totalTickets: 3,
        worksheetsCreated: 45
      },
      assignee: {
        id: '1',
        name: 'Sarah Johnson',
        avatar: null
      },
      messages: [
        {
          id: '1',
          type: 'customer',
          author: 'John Doe',
          message: 'I\'m unable to download worksheets as PDF. Getting error message.',
          timestamp: '2024-11-28T10:30:00Z',
          attachments: []
        },
        {
          id: '2',
          type: 'agent',
          author: 'Sarah Johnson',
          message: 'I\'ll help you with that. Can you share the error message?',
          timestamp: '2024-11-28T10:45:00Z',
          attachments: [],
          isInternal: false
        }
      ],
      tags: ['download-issue', 'pdf'],
      createdAt: '2024-11-28T10:30:00Z',
      updatedAt: '2024-11-28T10:45:00Z',
      firstResponseTime: 15,
      resolutionTime: null,
      satisfaction: null,
      relatedTickets: ['TKT-015', 'TKT-023'],
      slaStatus: 'on_track',
      nextSlaDeadline: '2024-11-29T10:30:00Z'
    }
  };
  return tickets[id];
};

// GET /api/admin/support/tickets/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const ticket = getTicket(params.id);
    
    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }
    
    // Check if user has access to this ticket
    const isAdmin = session.user.role === 'admin';
    const isOwner = ticket.customer.id === session.user.id;
    const isAssignee = ticket.assignee?.id === session.user.id;
    
    if (!isAdmin && !isOwner && !isAssignee) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }
    
    // Filter internal messages for non-admin users
    let filteredTicket = { ...ticket };
    if (!isAdmin && !isAssignee) {
      filteredTicket.messages = ticket.messages.filter(m => !m.isInternal);
    }
    
    return NextResponse.json(filteredTicket);
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ticket' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/support/tickets/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updates: TicketUpdate = await request.json();
    const ticket = getTicket(params.id);
    
    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }
    
    // Apply updates
    if (updates.status) ticket.status = updates.status;
    if (updates.priority) ticket.priority = updates.priority;
    if (updates.subject) ticket.subject = updates.subject;
    if (updates.category) ticket.category = updates.category;
    if (updates.tags) ticket.tags = updates.tags;
    
    if (updates.assigneeId !== undefined) {
      ticket.assignee = updates.assigneeId ? {
        id: updates.assigneeId,
        name: 'Assigned Agent',
        avatar: null
      } : null;
    }
    
    ticket.updatedAt = new Date().toISOString();
    
    // Calculate resolution time if ticket is being resolved
    if (updates.status === 'resolved' && !ticket.resolutionTime) {
      const created = new Date(ticket.createdAt);
      const resolved = new Date();
      ticket.resolutionTime = Math.round((resolved.getTime() - created.getTime()) / (1000 * 60)); // in minutes
    }
    
    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Error updating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to update ticket' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/support/tickets/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const ticket = getTicket(params.id);
    
    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }
    
    // In production, delete from database
    // For now, just return success
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    return NextResponse.json(
      { error: 'Failed to delete ticket' },
      { status: 500 }
    );
  }
}

// POST /api/admin/support/tickets/[id]/messages
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const messageData: MessageData = await request.json();
    const ticket = getTicket(params.id);
    
    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }
    
    // Check if user has access to this ticket
    const isAdmin = session.user.role === 'admin';
    const isOwner = ticket.customer.id === session.user.id;
    const isAssignee = ticket.assignee?.id === session.user.id;
    
    if (!isAdmin && !isOwner && !isAssignee) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }
    
    // Only admin and assignee can send internal messages
    if (messageData.isInternal && !isAdmin && !isAssignee) {
      return NextResponse.json(
        { error: 'Cannot send internal messages' },
        { status: 403 }
      );
    }
    
    // Create new message
    const newMessage = {
      id: String(ticket.messages.length + 1),
      type: isOwner && !isAdmin && !isAssignee ? 'customer' : 'agent',
      author: session.user.name || 'Unknown',
      message: messageData.message,
      timestamp: new Date().toISOString(),
      attachments: messageData.attachments || [],
      isInternal: messageData.isInternal
    };
    
    ticket.messages.push(newMessage);
    ticket.updatedAt = new Date().toISOString();
    
    // Update status if needed
    if (ticket.status === 'waiting' && newMessage.type === 'customer') {
      ticket.status = 'open';
    } else if (ticket.status === 'open' && newMessage.type === 'agent' && !ticket.firstResponseTime) {
      const created = new Date(ticket.createdAt);
      const responded = new Date();
      ticket.firstResponseTime = Math.round((responded.getTime() - created.getTime()) / (1000 * 60)); // in minutes
      ticket.status = 'in_progress';
    }
    
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('Error adding message:', error);
    return NextResponse.json(
      { error: 'Failed to add message' },
      { status: 500 }
    );
  }
}