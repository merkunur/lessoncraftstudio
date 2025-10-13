import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET /api/admin/email/campaigns/[id] - Get a single email campaign
export const GET = withAdmin(
  async (request: NextRequest, user: any, context: { params: { id: string } }) => {
    try {
      const campaign = await prisma.emailCampaign.findUnique({
        where: { id: context.params.id },
        include: {
          template: true,
          logs: {
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
        },
      });

      if (!campaign) {
        return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
      }

      return NextResponse.json({ campaign });
    } catch (error) {
      console.error('Get email campaign error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch email campaign' },
        { status: 500 }
      );
    }
  }
);

// PUT /api/admin/email/campaigns/[id] - Update an email campaign
export const PUT = withAdmin(
  async (request: NextRequest, user: any, context: { params: { id: string } }) => {
    try {
      // Check if campaign exists
      const existingCampaign = await prisma.emailCampaign.findUnique({
        where: { id: context.params.id },
      });

      if (!existingCampaign) {
        return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
      }

      // Can only edit draft campaigns
      if (existingCampaign.status !== 'draft') {
        return NextResponse.json(
          { error: 'Can only edit draft campaigns' },
          { status: 400 }
        );
      }

      const body = await request.json();

      // Update campaign
      const campaign = await prisma.emailCampaign.update({
        where: { id: context.params.id },
        data: body,
      });

      return NextResponse.json({
        message: 'Email campaign updated successfully',
        campaign,
      });
    } catch (error) {
      console.error('Update email campaign error:', error);
      return NextResponse.json(
        { error: 'Failed to update email campaign' },
        { status: 500 }
      );
    }
  }
);

// DELETE /api/admin/email/campaigns/[id] - Delete an email campaign
export const DELETE = withAdmin(
  async (request: NextRequest, user: any, context: { params: { id: string } }) => {
    try {
      // Check if campaign exists
      const campaign = await prisma.emailCampaign.findUnique({
        where: { id: context.params.id },
      });

      if (!campaign) {
        return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
      }

      // Can only delete draft or failed campaigns
      if (campaign.status !== 'draft' && campaign.status !== 'failed') {
        return NextResponse.json(
          { error: 'Can only delete draft or failed campaigns' },
          { status: 400 }
        );
      }

      // Delete campaign
      await prisma.emailCampaign.delete({
        where: { id: context.params.id },
      });

      return NextResponse.json({
        message: 'Email campaign deleted successfully',
      });
    } catch (error) {
      console.error('Delete email campaign error:', error);
      return NextResponse.json(
        { error: 'Failed to delete email campaign' },
        { status: 500 }
      );
    }
  }
);
