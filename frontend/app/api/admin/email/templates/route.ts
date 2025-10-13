import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET /api/admin/email/templates - List all email templates
export const GET = withAdmin(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get templates with pagination
    const [templates, total] = await Promise.all([
      prisma.emailTemplate.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.emailTemplate.count({ where }),
    ]);

    return NextResponse.json({
      templates,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get email templates error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch email templates' },
      { status: 500 }
    );
  }
});

// POST /api/admin/email/templates - Create a new email template
export const POST = withAdmin(async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { name, subject, htmlContent, textContent, variables, active } = body;

    // Validate required fields
    if (!name || !subject || !htmlContent) {
      return NextResponse.json(
        { error: 'Name, subject, and HTML content are required' },
        { status: 400 }
      );
    }

    // Check if template with this name already exists
    const existingTemplate = await prisma.emailTemplate.findUnique({
      where: { name },
    });

    if (existingTemplate) {
      return NextResponse.json(
        { error: 'A template with this name already exists' },
        { status: 400 }
      );
    }

    // Create template
    const template = await prisma.emailTemplate.create({
      data: {
        name,
        subject,
        htmlContent,
        textContent: textContent || null,
        variables: variables || [],
        active: active !== undefined ? active : true,
      },
    });

    return NextResponse.json({
      message: 'Email template created successfully',
      template,
    });
  } catch (error) {
    console.error('Create email template error:', error);
    return NextResponse.json(
      { error: 'Failed to create email template' },
      { status: 500 }
    );
  }
});
