import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

interface TicketFilters {
  status?: string;
  priority?: string;
  assignee?: string;
  search?: string;
}

interface CreateTicketData {
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  customerId?: string;
  assigneeId?: string;
  tags?: string[];
  attachments?: string[];
}

interface UpdateTicketData {
  status?: 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId?: string;
  tags?: string[];
}

// Mock database
const tickets = [
  {
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
    satisfaction: null
  },
  {
    id: '2',
    ticketNumber: 'TKT-002',
    subject: 'Feature request: Math symbols',
    status: 'in_progress',
    priority: 'medium',
    category: 'Feature Request',
    customer: {
      id: '2',
      name: 'Emily Chen',
      email: 'emily@school.edu',
      plan: 'full',
      joinDate: '2023-09-20',
      totalTickets: 5,
      worksheetsCreated: 234
    },
    assignee: {
      id: '2',
      name: 'Mike Wilson',
      avatar: null
    },
    messages: [
      {
        id: '3',
        type: 'customer',
        author: 'Emily Chen',
        message: 'Would love to have more math symbols available in the equation editor.',
        timestamp: '2024-11-27T14:20:00Z',
        attachments: []
      }
    ],
    tags: ['feature-request', 'math'],
    createdAt: '2024-11-27T14:20:00Z',
    updatedAt: '2024-11-27T15:00:00Z',
    firstResponseTime: 40,
    resolutionTime: null,
    satisfaction: null
  },
  {
    id: '3',
    ticketNumber: 'TKT-003',
    subject: 'Billing question',
    status: 'resolved',
    priority: 'low',
    category: 'Billing',
    customer: {
      id: '3',
      name: 'Robert Smith',
      email: 'robert@email.com',
      plan: 'core',
      joinDate: '2024-02-10',
      totalTickets: 1,
      worksheetsCreated: 67
    },
    assignee: {
      id: '1',
      name: 'Sarah Johnson',
      avatar: null
    },
    messages: [
      {
        id: '4',
        type: 'customer',
        author: 'Robert Smith',
        message: 'When will my subscription renew?',
        timestamp: '2024-11-25T09:00:00Z',
        attachments: []
      },
      {
        id: '5',
        type: 'agent',
        author: 'Sarah Johnson',
        message: 'Your subscription will renew on March 10, 2024.',
        timestamp: '2024-11-25T09:30:00Z',
        attachments: [],
        isInternal: false
      }
    ],
    tags: ['billing', 'subscription'],
    createdAt: '2024-11-25T09:00:00Z',
    updatedAt: '2024-11-25T09:30:00Z',
    firstResponseTime: 30,
    resolutionTime: 30,
    satisfaction: 5
  }
];

// GET /api/admin/support/tickets
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    // Apply filters
    let filteredTickets = [...tickets];
    
    const status = searchParams.get('status');
    if (status && status !== 'all') {
      filteredTickets = filteredTickets.filter(t => t.status === status);
    }
    
    const priority = searchParams.get('priority');
    if (priority && priority !== 'all') {
      filteredTickets = filteredTickets.filter(t => t.priority === priority);
    }
    
    const assignee = searchParams.get('assignee');
    if (assignee && assignee !== 'all') {
      if (assignee === 'unassigned') {
        filteredTickets = filteredTickets.filter(t => !t.assignee);
      } else {
        filteredTickets = filteredTickets.filter(t => t.assignee?.id === assignee);
      }
    }
    
    const search = searchParams.get('search');
    if (search) {
      const searchLower = search.toLowerCase();
      filteredTickets = filteredTickets.filter(t => 
        t.subject.toLowerCase().includes(searchLower) ||
        t.ticketNumber.toLowerCase().includes(searchLower) ||
        t.customer.name.toLowerCase().includes(searchLower) ||
        t.customer.email.toLowerCase().includes(searchLower) ||
        t.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Sort tickets
    filteredTickets.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'ticketNumber':
          comparison = a.ticketNumber.localeCompare(b.ticketNumber);
          break;
        case 'subject':
          comparison = a.subject.localeCompare(b.subject);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'priority':
          const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'customer':
          comparison = a.customer.name.localeCompare(b.customer.name);
          break;
        case 'createdAt':
        case 'updatedAt':
          comparison = new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime();
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    // Paginate
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTickets = filteredTickets.slice(startIndex, endIndex);
    
    // Calculate statistics
    const stats = {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in_progress').length,
      resolved: tickets.filter(t => t.status === 'resolved').length,
      avgResponseTime: Math.round(
        tickets.reduce((sum, t) => sum + (t.firstResponseTime || 0), 0) / 
        tickets.filter(t => t.firstResponseTime).length
      ),
      avgResolutionTime: Math.round(
        tickets.reduce((sum, t) => sum + (t.resolutionTime || 0), 0) / 
        tickets.filter(t => t.resolutionTime).length
      ),
      satisfaction: parseFloat(
        (tickets.reduce((sum, t) => sum + (t.satisfaction || 0), 0) / 
        tickets.filter(t => t.satisfaction).length).toFixed(1)
      )
    };
    
    return NextResponse.json({
      tickets: paginatedTickets,
      pagination: {
        page,
        limit,
        total: filteredTickets.length,
        pages: Math.ceil(filteredTickets.length / limit)
      },
      stats
    });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tickets' },
      { status: 500 }
    );
  }
}

// POST /api/admin/support/tickets
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data: CreateTicketData = await request.json();
    
    // Validate required fields
    if (!data.subject || !data.message || !data.priority || !data.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create new ticket
    const newTicket = {
      id: String(tickets.length + 1),
      ticketNumber: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
      subject: data.subject,
      status: 'open' as const,
      priority: data.priority,
      category: data.category,
      customer: {
        id: data.customerId || session.user.id,
        name: session.user.name || 'Unknown',
        email: session.user.email || '',
        plan: 'free',
        joinDate: new Date().toISOString(),
        totalTickets: 1,
        worksheetsCreated: 0
      },
      assignee: data.assigneeId ? {
        id: data.assigneeId,
        name: 'Assigned Agent',
        avatar: null
      } : null,
      messages: [
        {
          id: '1',
          type: 'customer' as const,
          author: session.user.name || 'Unknown',
          message: data.message,
          timestamp: new Date().toISOString(),
          attachments: data.attachments || []
        }
      ],
      tags: data.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      firstResponseTime: null,
      resolutionTime: null,
      satisfaction: null
    };
    
    tickets.push(newTicket);
    
    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/support/tickets (bulk update)
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { ticketIds, updates }: { ticketIds: string[], updates: UpdateTicketData } = await request.json();
    
    if (!ticketIds || ticketIds.length === 0) {
      return NextResponse.json(
        { error: 'No tickets specified' },
        { status: 400 }
      );
    }
    
    // Update tickets
    let updatedCount = 0;
    ticketIds.forEach(id => {
      const ticket = tickets.find(t => t.id === id);
      if (ticket) {
        if (updates.status) ticket.status = updates.status;
        if (updates.priority) ticket.priority = updates.priority;
        if (updates.assigneeId !== undefined) {
          ticket.assignee = updates.assigneeId ? {
            id: updates.assigneeId,
            name: 'Assigned Agent',
            avatar: null
          } : null;
        }
        if (updates.tags) ticket.tags = updates.tags;
        ticket.updatedAt = new Date().toISOString();
        updatedCount++;
      }
    });
    
    return NextResponse.json({
      success: true,
      updatedCount
    });
  } catch (error) {
    console.error('Error updating tickets:', error);
    return NextResponse.json(
      { error: 'Failed to update tickets' },
      { status: 500 }
    );
  }
}