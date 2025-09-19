import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

interface ActivityEvent {
  id: string;
  type: 'login' | 'logout' | 'create' | 'update' | 'delete' | 'share' | 'download' | 'view' | 'settings' | 'payment';
  category: 'auth' | 'worksheet' | 'user' | 'file' | 'subscription' | 'security';
  action: string;
  description: string;
  metadata?: {
    itemId?: string;
    itemName?: string;
    itemType?: string;
    changes?: Record<string, any>;
    oldValue?: any;
    newValue?: any;
    ip?: string;
    userAgent?: string;
    location?: string;
    duration?: number;
  };
  timestamp: string;
  userId: string;
  userName: string;
}

interface ActivityStats {
  totalEvents: number;
  eventsToday: number;
  eventsThisWeek: number;
  eventsThisMonth: number;
  mostActiveDay: string;
  mostActiveHour: number;
  topActions: Array<{ action: string; count: number }>;
  deviceBreakdown: Record<string, number>;
  locationBreakdown: Record<string, number>;
}

// Mock activity history
const activityHistory: ActivityEvent[] = [
  {
    id: 'act_1',
    type: 'login',
    category: 'auth',
    action: 'User login',
    description: 'Successfully logged in',
    metadata: {
      ip: '192.168.1.100',
      userAgent: 'Chrome/119.0 Windows',
      location: 'San Francisco, CA'
    },
    timestamp: new Date().toISOString(),
    userId: 'user_1',
    userName: 'John Doe'
  },
  {
    id: 'act_2',
    type: 'create',
    category: 'worksheet',
    action: 'Created worksheet',
    description: 'Created new math worksheet',
    metadata: {
      itemId: 'ws_123',
      itemName: 'Addition Practice Grade 2',
      itemType: 'worksheet'
    },
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    userId: 'user_1',
    userName: 'John Doe'
  },
  {
    id: 'act_3',
    type: 'download',
    category: 'worksheet',
    action: 'Downloaded worksheet',
    description: 'Downloaded worksheet as PDF',
    metadata: {
      itemId: 'ws_123',
      itemName: 'Addition Practice Grade 2',
      itemType: 'pdf'
    },
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    userId: 'user_1',
    userName: 'John Doe'
  },
  {
    id: 'act_4',
    type: 'update',
    category: 'user',
    action: 'Updated profile',
    description: 'Updated profile information',
    metadata: {
      changes: {
        bio: 'Updated bio text',
        location: 'San Francisco, CA'
      }
    },
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    userId: 'user_1',
    userName: 'John Doe'
  },
  {
    id: 'act_5',
    type: 'settings',
    category: 'security',
    action: 'Enabled 2FA',
    description: 'Two-factor authentication enabled',
    metadata: {
      oldValue: false,
      newValue: true
    },
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    userId: 'user_1',
    userName: 'John Doe'
  },
  {
    id: 'act_6',
    type: 'share',
    category: 'worksheet',
    action: 'Shared worksheet',
    description: 'Shared worksheet with 5 users',
    metadata: {
      itemId: 'ws_124',
      itemName: 'Science Quiz',
      itemType: 'worksheet'
    },
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    userId: 'user_1',
    userName: 'John Doe'
  },
  {
    id: 'act_7',
    type: 'payment',
    category: 'subscription',
    action: 'Subscription renewed',
    description: 'Premium subscription auto-renewed',
    metadata: {
      itemType: 'subscription',
      newValue: 'premium'
    },
    timestamp: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
    userId: 'user_1',
    userName: 'John Doe'
  }
];

// Add more mock data
for (let i = 8; i <= 50; i++) {
  const types: ActivityEvent['type'][] = ['create', 'update', 'delete', 'download', 'view', 'share'];
  const categories: ActivityEvent['category'][] = ['worksheet', 'file', 'user'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];

  activityHistory.push({
    id: `act_${i}`,
    type: randomType,
    category: randomCategory,
    action: `${randomType} ${randomCategory}`,
    description: `${randomType} operation on ${randomCategory}`,
    metadata: {
      itemId: `item_${i}`,
      itemName: `Item ${i}`,
      itemType: randomCategory
    },
    timestamp: new Date(Date.now() - i * 3600000 * 24).toISOString(),
    userId: 'user_1',
    userName: 'John Doe'
  });
}

class ActivityService {
  getActivities(
    userId: string,
    options: {
      limit?: number;
      offset?: number;
      type?: string;
      category?: string;
      startDate?: string;
      endDate?: string;
      search?: string;
    } = {}
  ) {
    let filtered = activityHistory.filter(a => a.userId === userId);

    // Apply filters
    if (options.type) {
      filtered = filtered.filter(a => a.type === options.type);
    }

    if (options.category) {
      filtered = filtered.filter(a => a.category === options.category);
    }

    if (options.startDate) {
      const start = new Date(options.startDate);
      filtered = filtered.filter(a => new Date(a.timestamp) >= start);
    }

    if (options.endDate) {
      const end = new Date(options.endDate);
      filtered = filtered.filter(a => new Date(a.timestamp) <= end);
    }

    if (options.search) {
      const searchLower = options.search.toLowerCase();
      filtered = filtered.filter(a =>
        a.description.toLowerCase().includes(searchLower) ||
        a.action.toLowerCase().includes(searchLower) ||
        a.metadata?.itemName?.toLowerCase().includes(searchLower)
      );
    }

    // Sort by timestamp descending
    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Apply pagination
    const offset = options.offset || 0;
    const limit = options.limit || 20;
    const paginated = filtered.slice(offset, offset + limit);

    return {
      activities: paginated,
      total: filtered.length,
      hasMore: offset + limit < filtered.length
    };
  }

  getActivityStats(userId: string): ActivityStats {
    const userActivities = activityHistory.filter(a => a.userId === userId);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Calculate events counts
    const eventsToday = userActivities.filter(a =>
      new Date(a.timestamp) >= today
    ).length;

    const eventsThisWeek = userActivities.filter(a =>
      new Date(a.timestamp) >= weekAgo
    ).length;

    const eventsThisMonth = userActivities.filter(a =>
      new Date(a.timestamp) >= monthAgo
    ).length;

    // Find most active day
    const dayActivity: Record<string, number> = {};
    userActivities.forEach(a => {
      const day = new Date(a.timestamp).toDateString();
      dayActivity[day] = (dayActivity[day] || 0) + 1;
    });

    const mostActiveDay = Object.entries(dayActivity)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A';

    // Find most active hour
    const hourActivity: Record<number, number> = {};
    userActivities.forEach(a => {
      const hour = new Date(a.timestamp).getHours();
      hourActivity[hour] = (hourActivity[hour] || 0) + 1;
    });

    const mostActiveHour = Object.entries(hourActivity)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || '0';

    // Top actions
    const actionCounts: Record<string, number> = {};
    userActivities.forEach(a => {
      actionCounts[a.action] = (actionCounts[a.action] || 0) + 1;
    });

    const topActions = Object.entries(actionCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([action, count]) => ({ action, count }));

    // Device breakdown (mock)
    const deviceBreakdown = {
      Desktop: Math.floor(userActivities.length * 0.6),
      Mobile: Math.floor(userActivities.length * 0.3),
      Tablet: Math.floor(userActivities.length * 0.1)
    };

    // Location breakdown (mock)
    const locationBreakdown = {
      'San Francisco': Math.floor(userActivities.length * 0.7),
      'New York': Math.floor(userActivities.length * 0.2),
      'Other': Math.floor(userActivities.length * 0.1)
    };

    return {
      totalEvents: userActivities.length,
      eventsToday,
      eventsThisWeek,
      eventsThisMonth,
      mostActiveDay,
      mostActiveHour: parseInt(mostActiveHour),
      topActions,
      deviceBreakdown,
      locationBreakdown
    };
  }

  async exportActivities(
    userId: string,
    format: 'csv' | 'json'
  ): Promise<string> {
    const activities = activityHistory.filter(a => a.userId === userId);

    if (format === 'json') {
      return JSON.stringify(activities, null, 2);
    }

    // CSV format
    const headers = ['ID', 'Type', 'Category', 'Action', 'Description', 'Timestamp'];
    const rows = activities.map(a => [
      a.id,
      a.type,
      a.category,
      a.action,
      a.description,
      a.timestamp
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return csv;
  }

  logActivity(event: Omit<ActivityEvent, 'id' | 'timestamp'>) {
    const newEvent: ActivityEvent = {
      ...event,
      id: `act_${activityHistory.length + 1}`,
      timestamp: new Date().toISOString()
    };

    activityHistory.unshift(newEvent);
    return newEvent;
  }
}

const activityService = new ActivityService();

// GET /api/admin/profile/activity
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const type = searchParams.get('type') || undefined;
    const category = searchParams.get('category') || undefined;
    const startDate = searchParams.get('startDate') || undefined;
    const endDate = searchParams.get('endDate') || undefined;
    const search = searchParams.get('search') || undefined;
    const stats = searchParams.get('stats') === 'true';

    const userId = session.user.id || 'user_1';

    if (stats) {
      const activityStats = activityService.getActivityStats(userId);
      return NextResponse.json(activityStats);
    }

    const result = activityService.getActivities(userId, {
      limit,
      offset,
      type,
      category,
      startDate,
      endDate,
      search
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

// POST /api/admin/profile/activity/export
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { format } = await request.json();

    if (!format || !['csv', 'json'].includes(format)) {
      return NextResponse.json(
        { error: 'Invalid export format' },
        { status: 400 }
      );
    }

    const userId = session.user.id || 'user_1';
    const data = await activityService.exportActivities(userId, format);

    const contentType = format === 'csv' ? 'text/csv' : 'application/json';
    const filename = `activity-export-${new Date().toISOString().split('T')[0]}.${format}`;

    return new NextResponse(data, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });
  } catch (error) {
    console.error('Error exporting activities:', error);
    return NextResponse.json(
      { error: 'Failed to export activities' },
      { status: 500 }
    );
  }
}