export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdmin } from '@/lib/auth-middleware';
import { withCors } from '@/lib/cors';

/**
 * GET /api/admin/worksheet-samples
 * Retrieves all worksheet samples
 */
async function getHandler(request: NextRequest, userId: string) {
  try {
    const samples = await prisma.sampleWorksheet.findMany({
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json({
      samples,
      total: samples.length,
    });
  } catch (error) {
    console.error('Error fetching worksheet samples:', error);
    return NextResponse.json(
      { error: 'Failed to fetch worksheet samples' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/worksheet-samples
 * Creates a new worksheet sample
 */
async function postHandler(request: NextRequest, userId: string) {
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

    if (!appName || !title || !thumbnailUrl) {
      return NextResponse.json(
        { error: 'appName, title, and thumbnailUrl are required' },
        { status: 400 }
      );
    }

    // Get max sortOrder if not provided
    let finalSortOrder = sortOrder;
    if (finalSortOrder === undefined) {
      const maxSample = await prisma.sampleWorksheet.findFirst({
        orderBy: { sortOrder: 'desc' },
        select: { sortOrder: true },
      });
      finalSortOrder = (maxSample?.sortOrder || 0) + 1;
    }

    const sample = await prisma.sampleWorksheet.create({
      data: {
        appName,
        title,
        description: description || '',
        thumbnailUrl,
        fileUrl: fileUrl || '',
        category: category || null,
        difficulty: difficulty || null,
        ageRange: ageRange || null,
        featured: featured || false,
        sortOrder: finalSortOrder,
      },
    });

    return NextResponse.json({
      message: 'Worksheet sample created successfully',
      sample,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating worksheet sample:', error);
    return NextResponse.json(
      { error: 'Failed to create worksheet sample' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/worksheet-samples
 * Updates an existing worksheet sample
 */
async function putHandler(request: NextRequest, userId: string) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Sample ID is required' },
        { status: 400 }
      );
    }

    const sample = await prisma.sampleWorksheet.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      message: 'Worksheet sample updated successfully',
      sample,
    });
  } catch (error) {
    console.error('Error updating worksheet sample:', error);
    return NextResponse.json(
      { error: 'Failed to update worksheet sample' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/worksheet-samples
 * Deletes a worksheet sample
 */
async function deleteHandler(request: NextRequest, userId: string) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Sample ID is required' },
        { status: 400 }
      );
    }

    await prisma.sampleWorksheet.delete({
      where: { id },
    });

    return NextResponse.json({
      message: 'Worksheet sample deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting worksheet sample:', error);
    return NextResponse.json(
      { error: 'Failed to delete worksheet sample' },
      { status: 500 }
    );
  }
}

// Export wrapped handlers with CORS and Admin authentication
export const GET = withCors(async (request: NextRequest) => withAdmin(request, getHandler));
export const POST = withCors(async (request: NextRequest) => withAdmin(request, postHandler));
export const PUT = withCors(async (request: NextRequest) => withAdmin(request, putHandler));
export const DELETE = withCors(async (request: NextRequest) => withAdmin(request, deleteHandler));

// Handle OPTIONS preflight requests
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
    },
  });
}
