import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/server-auth';

interface SearchLog {
  id: string;
  query: string;
  userId: string;
  resultCount: number;
  clickedResults: string[];
  timestamp: string;
  searchTime: number;
  filters?: any[];
  type?: string;
}

interface SearchAnalytics {
  overview: {
    totalSearches: number;
    uniqueUsers: number;
    avgResultsPerSearch: number;
    avgSearchTime: number;
    clickThroughRate: number;
    zeroResultRate: number;
  };
  popularSearches: Array<{
    term: string;
    count: number;
    avgResults: number;
    clickRate: number;
  }>;
  recentSearches: Array<{
    query: string;
    user: string;
    results: number;
    timestamp: string;
  }>;
  searchVolume: Array<{
    date: string;
    searches: number;
    uniqueUsers: number;
  }>;
  contentTypeBreakdown: Record<string, number>;
  topFilters: Array<{
    filter: string;
    count: number;
  }>;
  zeroResultQueries: Array<{
    query: string;
    count: number;
    lastSeen: string;
  }>;
  userSearchBehavior: {
    avgSearchesPerUser: number;
    avgQueryLength: number;
    filterUsageRate: number;
    refinementRate: number;
  };
}

// Mock search logs - in production, use real database
const searchLogs: SearchLog[] = [
  {
    id: '1',
    query: 'math worksheet',
    userId: 'user_1',
    resultCount: 45,
    clickedResults: ['worksheet_1', 'worksheet_2'],
    timestamp: '2024-11-28T15:30:00Z',
    searchTime: 234,
    type: 'worksheet'
  },
  {
    id: '2',
    query: 'grade 2',
    userId: 'user_2',
    resultCount: 78,
    clickedResults: ['worksheet_1'],
    timestamp: '2024-11-28T15:25:00Z',
    searchTime: 189,
    filters: [{ field: 'grade', value: '2' }]
  },
  {
    id: '3',
    query: 'john doe',
    userId: 'user_1',
    resultCount: 3,
    clickedResults: ['user_1'],
    timestamp: '2024-11-28T15:20:00Z',
    searchTime: 145,
    type: 'user'
  },
  {
    id: '4',
    query: 'premium users',
    userId: 'user_3',
    resultCount: 23,
    clickedResults: [],
    timestamp: '2024-11-28T14:00:00Z',
    searchTime: 267,
    type: 'user',
    filters: [{ field: 'plan', value: 'premium' }]
  },
  {
    id: '5',
    query: 'nonexistent',
    userId: 'user_2',
    resultCount: 0,
    clickedResults: [],
    timestamp: '2024-11-28T13:00:00Z',
    searchTime: 98
  },
  // Add more historical data
  ...Array.from({ length: 100 }, (_, i) => ({
    id: String(6 + i),
    query: ['math', 'science', 'english', 'worksheet', 'grade', 'test', 'quiz'][Math.floor(Math.random() * 7)],
    userId: `user_${Math.floor(Math.random() * 10) + 1}`,
    resultCount: Math.floor(Math.random() * 100),
    clickedResults: Math.random() > 0.3 ? [`item_${Math.floor(Math.random() * 10)}`] : [],
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    searchTime: Math.floor(Math.random() * 500) + 50,
    type: ['worksheet', 'user', 'blog', 'all'][Math.floor(Math.random() * 4)]
  }))
];

class AnalyticsService {
  getAnalytics(timeRange: string = '7d'): SearchAnalytics {
    const now = new Date();
    const startDate = this.getStartDate(timeRange);
    
    // Filter logs by time range
    const relevantLogs = searchLogs.filter(log => 
      new Date(log.timestamp) >= startDate
    );

    // Calculate overview metrics
    const uniqueUsers = new Set(relevantLogs.map(log => log.userId)).size;
    const totalSearches = relevantLogs.length;
    const avgResultsPerSearch = relevantLogs.reduce((sum, log) => sum + log.resultCount, 0) / totalSearches || 0;
    const avgSearchTime = relevantLogs.reduce((sum, log) => sum + log.searchTime, 0) / totalSearches || 0;
    const clickedSearches = relevantLogs.filter(log => log.clickedResults.length > 0).length;
    const clickThroughRate = (clickedSearches / totalSearches) * 100 || 0;
    const zeroResultSearches = relevantLogs.filter(log => log.resultCount === 0).length;
    const zeroResultRate = (zeroResultSearches / totalSearches) * 100 || 0;

    // Calculate popular searches
    const searchCounts = new Map<string, { count: number; totalResults: number; clicks: number }>();
    relevantLogs.forEach(log => {
      const current = searchCounts.get(log.query) || { count: 0, totalResults: 0, clicks: 0 };
      searchCounts.set(log.query, {
        count: current.count + 1,
        totalResults: current.totalResults + log.resultCount,
        clicks: current.clicks + (log.clickedResults.length > 0 ? 1 : 0)
      });
    });

    const popularSearches = Array.from(searchCounts.entries())
      .map(([term, data]) => ({
        term,
        count: data.count,
        avgResults: Math.round(data.totalResults / data.count),
        clickRate: Math.round((data.clicks / data.count) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Recent searches
    const recentSearches = relevantLogs
      .slice(0, 10)
      .map(log => ({
        query: log.query,
        user: log.userId,
        results: log.resultCount,
        timestamp: log.timestamp
      }));

    // Search volume by day
    const volumeByDay = new Map<string, { searches: number; users: Set<string> }>();
    relevantLogs.forEach(log => {
      const date = new Date(log.timestamp).toISOString().split('T')[0];
      const current = volumeByDay.get(date) || { searches: 0, users: new Set() };
      current.searches++;
      current.users.add(log.userId);
      volumeByDay.set(date, current);
    });

    const searchVolume = Array.from(volumeByDay.entries())
      .map(([date, data]) => ({
        date,
        searches: data.searches,
        uniqueUsers: data.users.size
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-7); // Last 7 days

    // Content type breakdown
    const contentTypeBreakdown: Record<string, number> = {};
    relevantLogs.forEach(log => {
      const type = log.type || 'all';
      contentTypeBreakdown[type] = (contentTypeBreakdown[type] || 0) + 1;
    });

    // Top filters
    const filterCounts = new Map<string, number>();
    relevantLogs.forEach(log => {
      if (log.filters) {
        log.filters.forEach(filter => {
          const key = `${filter.field}:${filter.value}`;
          filterCounts.set(key, (filterCounts.get(key) || 0) + 1);
        });
      }
    });

    const topFilters = Array.from(filterCounts.entries())
      .map(([filter, count]) => ({ filter, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Zero result queries
    const zeroResultMap = new Map<string, { count: number; lastSeen: string }>();
    relevantLogs
      .filter(log => log.resultCount === 0)
      .forEach(log => {
        const current = zeroResultMap.get(log.query) || { count: 0, lastSeen: '' };
        zeroResultMap.set(log.query, {
          count: current.count + 1,
          lastSeen: log.timestamp
        });
      });

    const zeroResultQueries = Array.from(zeroResultMap.entries())
      .map(([query, data]) => ({ query, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // User search behavior
    const userSearchCounts = new Map<string, number>();
    relevantLogs.forEach(log => {
      userSearchCounts.set(log.userId, (userSearchCounts.get(log.userId) || 0) + 1);
    });

    const avgSearchesPerUser = Array.from(userSearchCounts.values())
      .reduce((sum, count) => sum + count, 0) / userSearchCounts.size || 0;

    const avgQueryLength = relevantLogs
      .reduce((sum, log) => sum + log.query.length, 0) / relevantLogs.length || 0;

    const searchesWithFilters = relevantLogs.filter(log => log.filters && log.filters.length > 0).length;
    const filterUsageRate = (searchesWithFilters / totalSearches) * 100 || 0;

    // Check for query refinements (same user, similar query within 5 minutes)
    const refinements = relevantLogs.filter((log, index) => {
      if (index === 0) return false;
      const prevLog = relevantLogs[index - 1];
      const timeDiff = new Date(log.timestamp).getTime() - new Date(prevLog.timestamp).getTime();
      return log.userId === prevLog.userId && timeDiff < 5 * 60 * 1000;
    }).length;
    const refinementRate = (refinements / totalSearches) * 100 || 0;

    return {
      overview: {
        totalSearches,
        uniqueUsers,
        avgResultsPerSearch: Math.round(avgResultsPerSearch),
        avgSearchTime: Math.round(avgSearchTime),
        clickThroughRate: Math.round(clickThroughRate),
        zeroResultRate: Math.round(zeroResultRate)
      },
      popularSearches,
      recentSearches,
      searchVolume,
      contentTypeBreakdown,
      topFilters,
      zeroResultQueries,
      userSearchBehavior: {
        avgSearchesPerUser: Math.round(avgSearchesPerUser * 10) / 10,
        avgQueryLength: Math.round(avgQueryLength),
        filterUsageRate: Math.round(filterUsageRate),
        refinementRate: Math.round(refinementRate)
      }
    };
  }

  private getStartDate(timeRange: string): Date {
    const now = new Date();
    switch (timeRange) {
      case '1d':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case '7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case '30d':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      case '90d':
        return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
  }

  logSearch(query: string, userId: string, resultCount: number, searchTime: number, filters?: any[], type?: string): void {
    const newLog: SearchLog = {
      id: String(searchLogs.length + 1),
      query,
      userId,
      resultCount,
      clickedResults: [],
      timestamp: new Date().toISOString(),
      searchTime,
      filters,
      type
    };
    searchLogs.unshift(newLog);
  }

  logClick(searchId: string, resultId: string): void {
    const log = searchLogs.find(l => l.id === searchId);
    if (log && !log.clickedResults.includes(resultId)) {
      log.clickedResults.push(resultId);
    }
  }
}

const analyticsService = new AnalyticsService();

// GET /api/admin/search/analytics
export async function GET(request: NextRequest) {
  try {
    const session = await getAuthUser(request);
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const timeRange = searchParams.get('timeRange') || '7d';

    const analytics = analyticsService.getAnalytics(timeRange);

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error fetching search analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

// POST /api/admin/search/analytics/log
export async function POST(request: NextRequest) {
  try {
    const session = await getAuthUser(request);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    if (data.action === 'search') {
      analyticsService.logSearch(
        data.query,
        session.user.id || 'anonymous',
        data.resultCount,
        data.searchTime || 0,
        data.filters,
        data.type
      );
    } else if (data.action === 'click') {
      analyticsService.logClick(data.searchId, data.resultId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging search analytics:', error);
    return NextResponse.json(
      { error: 'Failed to log analytics' },
      { status: 500 }
    );
  }
}