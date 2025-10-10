import { NextRequest, NextResponse } from 'next/server';
import { UserAnalytics } from '@/types/analytics';

export const dynamic = 'force-dynamic';

// GET /api/admin/analytics/users - Get user analytics
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const start = url.searchParams.get('start');
    const end = url.searchParams.get('end');

    // Mock user analytics data for development
    const userAnalytics: UserAnalytics = {
      totalUsers: 3847,
      activeUsers: 2156,
      newUsers: 423,
      returningUsers: 1733,
      churnRate: 5.2,
      retentionRate: 84.3,
      averageSessionDuration: 245, // seconds
      sessionsPerUser: 3.4,
      demographics: {
        countries: {
          'United States': 1234,
          'United Kingdom': 456,
          'Canada': 345,
          'Germany': 289,
          'France': 234,
          'Australia': 198,
          'Japan': 176,
          'Other': 915
        },
        languages: {
          'English': 2456,
          'German': 345,
          'French': 289,
          'Spanish': 234,
          'Portuguese': 198,
          'Italian': 156,
          'Other': 169
        },
        devices: {
          'desktop': 2308,
          'mobile': 1234,
          'tablet': 305
        }
      }
    };

    return NextResponse.json(userAnalytics);
  } catch (error) {
    console.error('Failed to get user analytics:', error);
    return NextResponse.json(
      { error: 'Failed to get user analytics' },
      { status: 500 }
    );
  }
}