import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Force dynamic to prevent build-time caching
export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET: Get a single sample by ID
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { id } = await params;

    const sample = await prisma.productSample.findUnique({
      where: { id }
    });

    if (!sample) {
      return NextResponse.json({
        success: false,
        error: 'Sample not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      sample
    });
  } catch (error) {
    console.error('[SAMPLES] Get error:', error);
    return NextResponse.json({
      success: false,
      error: `Failed to get sample: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}

// PUT: Update a sample by ID
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const body = await request.json();
    const { altText, title, description, keywords, grade, subject, fileSize, dimensions, sortOrder } = body;

    // Check if sample exists
    const existing = await prisma.productSample.findUnique({
      where: { id }
    });

    if (!existing) {
      return NextResponse.json({
        success: false,
        error: 'Sample not found'
      }, { status: 404 });
    }

    const sample = await prisma.productSample.update({
      where: { id },
      data: {
        altText: altText !== undefined ? altText : undefined,
        title: title !== undefined ? title : undefined,
        description: description !== undefined ? description : undefined,
        keywords: keywords !== undefined ? keywords : undefined,
        grade: grade !== undefined ? grade : undefined,
        subject: subject !== undefined ? subject : undefined,
        fileSize: fileSize !== undefined ? fileSize : undefined,
        dimensions: dimensions !== undefined ? dimensions : undefined,
        sortOrder: sortOrder !== undefined ? sortOrder : undefined
      }
    });

    return NextResponse.json({
      success: true,
      sample,
      message: 'Sample updated successfully'
    });
  } catch (error) {
    console.error('[SAMPLES] Update error:', error);
    return NextResponse.json({
      success: false,
      error: `Failed to update sample: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}

// DELETE: Delete a sample by ID
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { id } = await params;

    // Check if sample exists
    const existing = await prisma.productSample.findUnique({
      where: { id }
    });

    if (!existing) {
      return NextResponse.json({
        success: false,
        error: 'Sample not found'
      }, { status: 404 });
    }

    await prisma.productSample.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Sample deleted successfully'
    });
  } catch (error) {
    console.error('[SAMPLES] Delete error:', error);
    return NextResponse.json({
      success: false,
      error: `Failed to delete sample: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}
