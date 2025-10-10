import { NextRequest, NextResponse } from 'next/server';
import { MarketingCampaign } from '@/types/seo';

export const dynamic = 'force-dynamic';

// GET /api/admin/marketing/campaigns - Get marketing campaigns
export async function GET(request: NextRequest) {
  try {
    // Mock campaigns data for development
    const campaigns: MarketingCampaign[] = [
      {
        id: 'campaign_1',
        name: 'Back to School 2024',
        description: 'Promote worksheet generators for the new school year',
        type: 'content',
        status: 'active',
        startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        budget: 5000,
        goals: [
          {
            id: 'goal_1',
            metric: 'New Users',
            target: 1000,
            current: 456,
            unit: 'users'
          },
          {
            id: 'goal_2',
            metric: 'Conversions',
            target: 100,
            current: 34,
            unit: 'subscriptions'
          }
        ],
        channels: ['email', 'social', 'content'],
        performance: {
          impressions: 45678,
          clicks: 3456,
          conversions: 34,
          cost: 1234,
          roi: 175.5
        }
      },
      {
        id: 'campaign_2',
        name: 'Summer Learning Program',
        description: 'Target parents for summer educational activities',
        type: 'paid',
        status: 'active',
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        budget: 3000,
        goals: [
          {
            id: 'goal_3',
            metric: 'Sign-ups',
            target: 500,
            current: 234,
            unit: 'users'
          }
        ],
        channels: ['paid_search', 'social_ads'],
        performance: {
          impressions: 23456,
          clicks: 1234,
          conversions: 23,
          cost: 567,
          roi: 145.2
        }
      },
      {
        id: 'campaign_3',
        name: 'Teacher Appreciation Month',
        description: 'Special discounts and features for educators',
        type: 'email',
        status: 'planning',
        startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        budget: 1000,
        goals: [
          {
            id: 'goal_4',
            metric: 'Email Opens',
            target: 5000,
            current: 0,
            unit: 'opens'
          }
        ],
        channels: ['email', 'newsletter']
      },
      {
        id: 'campaign_4',
        name: 'Holiday Worksheets',
        description: 'Promote seasonal worksheet templates',
        type: 'social',
        status: 'completed',
        startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        budget: 2000,
        goals: [
          {
            id: 'goal_5',
            metric: 'Social Shares',
            target: 1000,
            current: 1234,
            unit: 'shares'
          }
        ],
        channels: ['facebook', 'instagram', 'pinterest'],
        performance: {
          impressions: 67890,
          clicks: 4567,
          conversions: 56,
          cost: 1890,
          roi: 210.3
        }
      }
    ];

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('Failed to get campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to get campaigns' },
      { status: 500 }
    );
  }
}

// POST /api/admin/marketing/campaigns - Create new campaign
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In production, create campaign in database
    const newCampaign: MarketingCampaign = {
      id: `campaign_${Date.now()}`,
      ...body,
      status: 'planning',
      performance: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        cost: 0,
        roi: 0
      }
    };

    return NextResponse.json(newCampaign);
  } catch (error) {
    console.error('Failed to create campaign:', error);
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    );
  }
}