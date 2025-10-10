import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsMetric } from '@/types/analytics';

export const dynamic = 'force-dynamic';

// GET /api/admin/analytics/metrics - Get key metrics
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const start = url.searchParams.get('start');
    const end = url.searchParams.get('end');

    // Mock metrics data for development
    const metrics: AnalyticsMetric[] = [
      {
        id: 'revenue',
        name: 'Revenue',
        value: 127450,
        change: 23.5,
        changeType: 'increase',
        period: 'vs last period',
        unit: 'currency'
      },
      {
        id: 'users',
        name: 'Total Users',
        value: 3847,
        change: 12.3,
        changeType: 'increase',
        period: 'vs last period'
      },
      {
        id: 'active_users',
        name: 'Active Users',
        value: 2156,
        change: -5.2,
        changeType: 'decrease',
        period: 'vs last period'
      },
      {
        id: 'worksheets',
        name: 'Worksheets Created',
        value: 15234,
        change: 45.7,
        changeType: 'increase',
        period: 'vs last period'
      },
      {
        id: 'conversion_rate',
        name: 'Conversion Rate',
        value: 3.4,
        change: 0.8,
        changeType: 'increase',
        period: 'vs last period',
        unit: 'percentage'
      },
      {
        id: 'avg_session',
        name: 'Avg Session Duration',
        value: 245,
        change: 15.0,
        changeType: 'increase',
        period: 'vs last period',
        unit: 'duration'
      },
      {
        id: 'bounce_rate',
        name: 'Bounce Rate',
        value: 42.3,
        change: -3.2,
        changeType: 'decrease',
        period: 'vs last period',
        unit: 'percentage'
      },
      {
        id: 'page_views',
        name: 'Page Views',
        value: 234567,
        change: 18.9,
        changeType: 'increase',
        period: 'vs last period'
      }
    ];

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Failed to get analytics metrics:', error);
    return NextResponse.json(
      { error: 'Failed to get analytics metrics' },
      { status: 500 }
    );
  }
}