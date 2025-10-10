import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const GET = withAdmin(async (request: NextRequest, user, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;

    const sample = await prisma.sampleWorksheet.findUnique({
      where: { id },
    });

    if (!sample) {
      return NextResponse.json(
        { error: 'Sample not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ sample });
  } catch (error) {
    console.error('Error fetching sample:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sample' },
      { status: 500 }
    );
  }
});

export const PATCH = withAdmin(async (request: NextRequest, user, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const body = await request.json();

    const sample = await prisma.sampleWorksheet.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ sample });
  } catch (error) {
    console.error('Error updating sample:', error);
    return NextResponse.json(
      { error: 'Failed to update sample' },
      { status: 500 }
    );
  }
});

export const DELETE = withAdmin(async (request: NextRequest, user, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;

    await prisma.sampleWorksheet.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting sample:', error);
    return NextResponse.json(
      { error: 'Failed to delete sample' },
      { status: 500 }
    );
  }
});
