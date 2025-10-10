import { NextRequest, NextResponse } from 'next/server';
import { EmailCampaign } from '@/types/email';

export const dynamic = 'force-dynamic';

// Mock campaign data
const mockCampaigns: EmailCampaign[] = [
  {
    id: 'camp_summer_2024',
    name: 'Summer Sale 2024',
    description: 'Back to school promotion',
    status: 'sent',
    type: 'one-time',
    templateId: 'temp_newsletter',
    audience: {
      type: 'all',
      totalRecipients: 5234
    },
    schedule: {
      sendAt: new Date('2024-07-01T10:00:00Z').toISOString(),
      timezone: 'UTC'
    },
    content: {
      subject: 'Summer Sale: 50% Off All Worksheets!',
      preheader: 'Prepare for the new school year'
    },
    settings: {
      trackOpens: true,
      trackClicks: true,
      utmParameters: {
        source: 'email',
        medium: 'campaign',
        campaign: 'summer_sale_2024'
      }
    },
    stats: {
      recipients: 5234,
      sent: 5234,
      delivered: 5156,
      opened: 2890,
      uniqueOpens: 2456,
      clicked: 678,
      uniqueClicks: 534,
      bounced: 78,
      hardBounces: 23,
      softBounces: 55,
      complained: 5,
      unsubscribed: 12,
      openRate: 47.6,
      clickRate: 10.4,
      bounceRate: 1.5,
      complaintRate: 0.1,
      unsubscribeRate: 0.23
    },
    createdAt: new Date('2024-06-15').toISOString(),
    updatedAt: new Date('2024-07-01').toISOString(),
    createdBy: 'user_1',
    sentAt: new Date('2024-07-01T10:00:00Z').toISOString(),
    completedAt: new Date('2024-07-01T10:45:00Z').toISOString()
  },
  {
    id: 'camp_new_features',
    name: 'New Features Announcement',
    description: 'Announcing worksheet editor v2',
    status: 'scheduled',
    type: 'one-time',
    templateId: 'temp_newsletter',
    audience: {
      type: 'segment',
      segmentId: 'seg_active_users',
      totalRecipients: 3456
    },
    schedule: {
      sendAt: new Date('2024-02-15T14:00:00Z').toISOString(),
      timezone: 'UTC'
    },
    content: {
      subject: 'Introducing: Advanced Worksheet Editor',
      preheader: 'Create better worksheets faster'
    },
    settings: {
      trackOpens: true,
      trackClicks: true,
      googleAnalytics: 'GA4-123456'
    },
    stats: {
      recipients: 3456,
      sent: 0,
      delivered: 0,
      opened: 0,
      uniqueOpens: 0,
      clicked: 0,
      uniqueClicks: 0,
      bounced: 0,
      hardBounces: 0,
      softBounces: 0,
      complained: 0,
      unsubscribed: 0
    },
    createdAt: new Date('2024-02-01').toISOString(),
    updatedAt: new Date('2024-02-01').toISOString(),
    createdBy: 'user_1'
  },
  {
    id: 'camp_weekly_tips',
    name: 'Weekly Teaching Tips',
    description: 'Educational content series',
    status: 'draft',
    type: 'recurring',
    templateId: 'temp_newsletter',
    audience: {
      type: 'list',
      listId: 'list_educators',
      totalRecipients: 1234
    },
    schedule: {
      recurring: {
        frequency: 'weekly',
        interval: 1,
        endDate: new Date('2024-12-31').toISOString()
      },
      timezone: 'UTC'
    },
    content: {
      subject: 'This Week\'s Teaching Tip',
      preheader: 'Improve your classroom effectiveness'
    },
    settings: {
      trackOpens: true,
      trackClicks: true
    },
    stats: {
      recipients: 0,
      sent: 0,
      delivered: 0,
      opened: 0,
      uniqueOpens: 0,
      clicked: 0,
      uniqueClicks: 0,
      bounced: 0,
      hardBounces: 0,
      softBounces: 0,
      complained: 0,
      unsubscribed: 0
    },
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date('2024-01-20').toISOString(),
    createdBy: 'user_2'
  }
];

// GET /api/emails/campaigns
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let campaigns = [...mockCampaigns];

    // Filter by status
    if (status) {
      campaigns = campaigns.filter(c => c.status === status);
    }

    // Filter by type
    if (type) {
      campaigns = campaigns.filter(c => c.type === type);
    }

    // Sort by created date (newest first)
    campaigns.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Pagination
    const paginatedCampaigns = campaigns.slice(offset, offset + limit);

    return NextResponse.json(paginatedCampaigns);
  } catch (error) {
    console.error('Failed to get email campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to get email campaigns' },
      { status: 500 }
    );
  }
}

// POST /api/emails/campaigns
export async function POST(request: NextRequest) {
  try {
    const campaign: EmailCampaign = await request.json();
    
    // Generate ID and timestamps
    campaign.id = `camp_${Date.now()}`;
    campaign.createdAt = new Date().toISOString();
    campaign.updatedAt = new Date().toISOString();
    campaign.status = 'draft';

    // Initialize stats
    campaign.stats = {
      recipients: campaign.audience.totalRecipients || 0,
      sent: 0,
      delivered: 0,
      opened: 0,
      uniqueOpens: 0,
      clicked: 0,
      uniqueClicks: 0,
      bounced: 0,
      hardBounces: 0,
      softBounces: 0,
      complained: 0,
      unsubscribed: 0
    };

    // In production, save to database
    console.log('Creating campaign:', campaign);

    return NextResponse.json({
      success: true,
      campaign,
      message: 'Campaign created successfully'
    });
  } catch (error) {
    console.error('Failed to create email campaign:', error);
    return NextResponse.json(
      { error: 'Failed to create email campaign' },
      { status: 500 }
    );
  }
}