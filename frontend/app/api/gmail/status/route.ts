import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

// GET /api/gmail/status - Check Gmail connection status
export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request);

    // Check if we have a valid Gmail token
    const gmailToken = await prisma.gmailToken.findFirst({
      orderBy: { updatedAt: 'desc' },
    });

    if (!gmailToken) {
      return NextResponse.json({
        connected: false,
        email: null,
        lastSync: null,
        importedCount: 0,
      });
    }

    // Check if token is expired
    const isExpired = new Date() > gmailToken.expiresAt;

    return NextResponse.json({
      connected: !isExpired,
      email: gmailToken.email,
      lastSync: gmailToken.lastSyncAt,
      importedCount: gmailToken.importedCount,
      expiresAt: gmailToken.expiresAt,
    });
  } catch (error) {
    console.error('Error checking Gmail status:', error);

    if (error instanceof Error) {
      if (error.message === 'Unauthorized') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      if (error.message.includes('Forbidden')) {
        return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
      }
    }

    return NextResponse.json({ error: 'Failed to check Gmail status' }, { status: 500 });
  }
}
