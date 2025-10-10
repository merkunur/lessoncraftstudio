import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const PATCH = withAdmin(async (request: NextRequest, user, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, slug } = body;

    const tag = await prisma.blogTag.update({
      where: { id },
      data: { name, slug },
    });

    return NextResponse.json({ tag });
  } catch (error) {
    console.error('Error updating tag:', error);
    return NextResponse.json(
      { error: 'Failed to update tag' },
      { status: 500 }
    );
  }
});

export const DELETE = withAdmin(async (request: NextRequest, user, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;

    await prisma.blogTag.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting tag:', error);
    return NextResponse.json(
      { error: 'Failed to delete tag' },
      { status: 500 }
    );
  }
});
