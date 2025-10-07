import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';

export const GET = withAdmin(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const app = searchParams.get('app') || '';
    const difficulty = searchParams.get('difficulty') || '';
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Build where clause
    const where: any = {};

    if (app) {
      where.appName = app;
    }

    if (difficulty) {
      where.difficulty = difficulty;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const skip = (page - 1) * limit;

    // Get samples
    const [samples, total] = await Promise.all([
      prisma.sampleWorksheet.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { featured: 'desc' },
          { sortOrder: 'asc' },
          { createdAt: 'desc' },
        ],
      }),
      prisma.sampleWorksheet.count({ where }),
    ]);

    return NextResponse.json({
      samples,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching samples:', error);
    return NextResponse.json(
      { error: 'Failed to fetch samples' },
      { status: 500 }
    );
  }
});

export const POST = withAdmin(async (request: NextRequest) => {
  try {
    const body = await request.json();
    const {
      appName,
      title,
      description,
      thumbnailUrl,
      fileUrl,
      category,
      difficulty,
      ageRange,
      featured,
      sortOrder,
    } = body;

    // Validate required fields
    if (!appName || !title || !thumbnailUrl || !fileUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get max sort order if not provided
    let finalSortOrder = sortOrder;
    if (finalSortOrder === undefined || finalSortOrder === null) {
      const maxSample = await prisma.sampleWorksheet.findFirst({
        where: { appName },
        orderBy: { sortOrder: 'desc' },
        select: { sortOrder: true },
      });
      finalSortOrder = (maxSample?.sortOrder ?? 0) + 1;
    }

    const sample = await prisma.sampleWorksheet.create({
      data: {
        appName,
        title,
        description,
        thumbnailUrl,
        fileUrl,
        category,
        difficulty,
        ageRange,
        featured: featured ?? false,
        sortOrder: finalSortOrder,
      },
    });

    return NextResponse.json({ sample }, { status: 201 });
  } catch (error) {
    console.error('Error creating sample:', error);
    return NextResponse.json(
      { error: 'Failed to create sample' },
      { status: 500 }
    );
  }
});
