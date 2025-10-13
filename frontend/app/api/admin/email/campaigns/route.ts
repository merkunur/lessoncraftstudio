import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET /api/admin/email/campaigns - List all email campaigns
export const GET = withAdmin(async (request: NextRequest, user: any) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (status !== 'all') {
      where.status = status;
    }

    // Get campaigns with pagination
    const [campaigns, total] = await Promise.all([
      prisma.emailCampaign.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.emailCampaign.count({ where }),
    ]);

    return NextResponse.json({
      campaigns,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get email campaigns error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch email campaigns' },
      { status: 500 }
    );
  }
});

// POST /api/admin/email/campaigns - Create a new email campaign
export const POST = withAdmin(async (request: NextRequest, user: any) => {
  try {
    const body = await request.json();
    const {
      name,
      description,
      subject,
      htmlContent,
      textContent,
      templateId,
      targetAudience,
      customUserIds,
      subscriptionTier,
      subscriptionStatus,
      scheduledAt,
    } = body;

    // Validate required fields
    if (!name || !subject || !htmlContent) {
      return NextResponse.json(
        { error: 'Name, subject, and HTML content are required' },
        { status: 400 }
      );
    }

    // If template is specified, verify it exists
    if (templateId) {
      const template = await prisma.emailTemplate.findUnique({
        where: { id: templateId },
      });
      if (!template) {
        return NextResponse.json(
          { error: 'Template not found' },
          { status: 404 }
        );
      }
    }

    // Calculate total recipients based on targeting
    let totalRecipients = 0;
    if (targetAudience === 'all') {
      totalRecipients = await prisma.user.count();
    } else if (targetAudience === 'custom' && customUserIds?.length) {
      totalRecipients = customUserIds.length;
    } else {
      const where: any = {};
      if (subscriptionTier) {
        where.subscriptionTier = subscriptionTier;
      }
      if (subscriptionStatus) {
        where.subscriptionStatus = subscriptionStatus;
      }
      totalRecipients = await prisma.user.count({ where });
    }

    // Create campaign
    const campaign = await prisma.emailCampaign.create({
      data: {
        name,
        description: description || null,
        subject,
        htmlContent,
        textContent: textContent || null,
        templateId: templateId || null,
        targetAudience: targetAudience || 'all',
        customUserIds: customUserIds || [],
        subscriptionTier: subscriptionTier || null,
        subscriptionStatus: subscriptionStatus || null,
        status: 'draft',
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        totalRecipients,
        createdBy: user.id,
      },
    });

    return NextResponse.json({
      message: 'Email campaign created successfully',
      campaign,
    });
  } catch (error) {
    console.error('Create email campaign error:', error);
    return NextResponse.json(
      { error: 'Failed to create email campaign' },
      { status: 500 }
    );
  }
});
