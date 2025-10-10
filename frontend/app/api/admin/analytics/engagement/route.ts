import { NextRequest, NextResponse } from 'next/server';
import { EngagementMetrics } from '@/types/analytics';

export const dynamic = 'force-dynamic';

// GET /api/admin/analytics/engagement - Get engagement metrics
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const start = url.searchParams.get('start');
    const end = url.searchParams.get('end');

    // Mock engagement metrics data for development
    const engagementMetrics: EngagementMetrics = {
      pageViews: 234567,
      uniqueVisitors: 45678,
      bounceRate: 42.3,
      averageTimeOnPage: 156, // seconds
      topPages: [
        {
          path: '/worksheets/word-search',
          views: 34567,
          avgDuration: 234,
          bounceRate: 32.1
        },
        {
          path: '/worksheets/math-puzzles',
          views: 28934,
          avgDuration: 189,
          bounceRate: 38.5
        },
        {
          path: '/home',
          views: 23456,
          avgDuration: 87,
          bounceRate: 52.3
        },
        {
          path: '/worksheets/coloring',
          views: 19876,
          avgDuration: 298,
          bounceRate: 28.9
        },
        {
          path: '/pricing',
          views: 15678,
          avgDuration: 145,
          bounceRate: 45.6
        },
        {
          path: '/about',
          views: 12345,
          avgDuration: 98,
          bounceRate: 58.7
        },
        {
          path: '/worksheets/crossword',
          views: 10987,
          avgDuration: 267,
          bounceRate: 31.2
        },
        {
          path: '/blog',
          views: 9876,
          avgDuration: 178,
          bounceRate: 41.3
        }
      ],
      userFlow: [
        { from: '/home', to: '/worksheets', count: 12345 },
        { from: '/worksheets', to: '/worksheets/word-search', count: 8765 },
        { from: '/worksheets', to: '/worksheets/math-puzzles', count: 6543 },
        { from: '/worksheets/word-search', to: '/download', count: 5432 },
        { from: '/home', to: '/pricing', count: 4321 },
        { from: '/pricing', to: '/signup', count: 2345 },
        { from: '/worksheets', to: '/worksheets/coloring', count: 3456 },
        { from: '/blog', to: '/worksheets', count: 2134 }
      ]
    };

    return NextResponse.json(engagementMetrics);
  } catch (error) {
    console.error('Failed to get engagement metrics:', error);
    return NextResponse.json(
      { error: 'Failed to get engagement metrics' },
      { status: 500 }
    );
  }
}