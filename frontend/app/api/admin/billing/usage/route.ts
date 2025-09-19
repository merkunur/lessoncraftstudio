import { NextRequest, NextResponse } from 'next/server';
import { UsageRecord } from '@/types/stripe';

// GET /api/admin/billing/usage - Get usage statistics
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const period = url.searchParams.get('period') || 'month';

    // Mock usage data for development
    const usage: Record<string, UsageRecord[]> = {
      worksheets: [
        {
          id: 'usage_1',
          subscriptionId: 'sub_1',
          metric: 'worksheets',
          quantity: 12,
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          metadata: { type: 'word_search' }
        },
        {
          id: 'usage_2',
          subscriptionId: 'sub_1',
          metric: 'worksheets',
          quantity: 8,
          timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          metadata: { type: 'math_puzzle' }
        },
        {
          id: 'usage_3',
          subscriptionId: 'sub_1',
          metric: 'worksheets',
          quantity: 15,
          timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
          metadata: { type: 'coloring_page' }
        },
        {
          id: 'usage_4',
          subscriptionId: 'sub_1',
          metric: 'worksheets',
          quantity: 10,
          timestamp: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
          metadata: { type: 'crossword' }
        }
      ],
      storage: [
        {
          id: 'usage_5',
          subscriptionId: 'sub_1',
          metric: 'storage',
          quantity: 0.5,
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'usage_6',
          subscriptionId: 'sub_1',
          metric: 'storage',
          quantity: 0.7,
          timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'usage_7',
          subscriptionId: 'sub_1',
          metric: 'storage',
          quantity: 0.6,
          timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'usage_8',
          subscriptionId: 'sub_1',
          metric: 'storage',
          quantity: 0.5,
          timestamp: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      api_calls: [
        {
          id: 'usage_9',
          subscriptionId: 'sub_1',
          metric: 'api_calls',
          quantity: 150,
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'usage_10',
          subscriptionId: 'sub_1',
          metric: 'api_calls',
          quantity: 200,
          timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'usage_11',
          subscriptionId: 'sub_1',
          metric: 'api_calls',
          quantity: 180,
          timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'usage_12',
          subscriptionId: 'sub_1',
          metric: 'api_calls',
          quantity: 220,
          timestamp: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      team_members: [
        {
          id: 'usage_13',
          subscriptionId: 'sub_1',
          metric: 'team_members',
          quantity: 3,
          timestamp: new Date().toISOString()
        }
      ]
    };

    return NextResponse.json(usage);
  } catch (error) {
    console.error('Failed to get usage data:', error);
    return NextResponse.json(
      { error: 'Failed to get usage data' },
      { status: 500 }
    );
  }
}