import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { sendCampaign } from '@/lib/email-campaigns';

export const dynamic = 'force-dynamic';

// POST /api/admin/email/campaigns/[id]/send - Send a campaign
export const POST = withAdmin(
  async (request: NextRequest, user: any, context: { params: { id: string } }) => {
    try {
      // Send campaign (integrates with existing email queue system)
      const result = await sendCampaign(context.params.id);

      if (result.success) {
        return NextResponse.json({
          message: 'Campaign sent successfully',
          sentCount: result.sentCount,
          failedCount: result.failedCount,
        });
      } else {
        return NextResponse.json(
          {
            error: result.error || 'Failed to send campaign',
            sentCount: result.sentCount,
            failedCount: result.failedCount,
          },
          { status: 500 }
        );
      }
    } catch (error: any) {
      console.error('Send campaign error:', error);
      return NextResponse.json(
        { error: error?.message || 'Failed to send campaign' },
        { status: 500 }
      );
    }
  }
);
