import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

// POST /api/gmail/disconnect - Disconnect Gmail integration
export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request);

    // Delete all Gmail tokens
    const deleteResult = await prisma.gmailToken.deleteMany({});

    console.log(`✅ Gmail disconnected, removed ${deleteResult.count} token(s)`);

    return NextResponse.json({
      success: true,
      message: 'Gmail disconnected successfully',
    });
  } catch (error) {
    console.error('Error disconnecting Gmail:', error);

    if (error instanceof Error) {
      if (error.message === 'Unauthorized') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      if (error.message.includes('Forbidden')) {
        return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
      }
    }

    return NextResponse.json({ error: 'Failed to disconnect Gmail' }, { status: 500 });
  }
}
